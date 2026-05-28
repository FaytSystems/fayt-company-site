function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sha256Hex(value) {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return [...new Uint8Array(hash)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function verifyTurnstile({ token, secret, ip }) {
  if (!secret) {
    return {
      ok: false,
      error: "TURNSTILE_SECRET_KEY is not configured.",
    };
  }

  if (!token) {
    return {
      ok: false,
      error: "Turnstile token missing.",
    };
  }

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);

  if (ip) {
    formData.append("remoteip", ip);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    return {
      ok: false,
      error: `Turnstile verification HTTP ${response.status}`,
    };
  }

  const result = await response.json();

  if (result.success !== true) {
    return {
      ok: false,
      error: "Turnstile verification failed.",
      codes: result["error-codes"] || [],
    };
  }

  return { ok: true };
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    if (!env.DB) {
      return jsonResponse(
        {
          ok: false,
          error: "D1 database binding DB is missing.",
        },
        500
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return jsonResponse(
        {
          ok: false,
          error: "Invalid JSON body.",
        },
        400
      );
    }

    const email = normalizeEmail(body.email);
    const name = String(body.name || "").trim().slice(0, 120);
    const source = String(body.source || "fayt-company-site").trim().slice(0, 120);
    const interest = String(body.interest || "beta-access").trim().slice(0, 240);
    const turnstileToken = String(body.turnstileToken || "").trim();

    if (!isValidEmail(email)) {
      return jsonResponse(
        {
          ok: false,
          error: "Enter a valid email address.",
        },
        400
      );
    }

    const ip =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("x-forwarded-for") ||
      "";

    const turnstile = await verifyTurnstile({
      token: turnstileToken,
      secret: env.TURNSTILE_SECRET_KEY,
      ip,
    });

    if (!turnstile.ok) {
      return jsonResponse(
        {
          ok: false,
          error: turnstile.error,
          codes: turnstile.codes || [],
        },
        403
      );
    }

    const userAgent = String(request.headers.get("user-agent") || "").slice(0, 300);
    const ipHash = ip ? await sha256Hex(ip) : "";

    await env.DB.prepare(`
      INSERT INTO email_signups (
        email,
        name,
        source,
        interest,
        user_agent,
        ip_hash,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(email) DO UPDATE SET
        name = excluded.name,
        source = excluded.source,
        interest = excluded.interest,
        user_agent = excluded.user_agent,
        ip_hash = excluded.ip_hash
    `)
      .bind(email, name, source, interest, userAgent, ipHash)
      .run();

    return jsonResponse({
      ok: true,
      message: "Signup received.",
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        error: "Signup failed.",
        detail: String(error?.message || error),
      },
      500
    );
  }
}

export async function onRequestGet() {
  return jsonResponse(
    {
      ok: false,
      error: "Use POST.",
    },
    405
  );
}
