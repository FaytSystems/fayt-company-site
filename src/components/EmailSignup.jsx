import { useEffect, useRef, useState } from "react";

const TURNSTILE_SITE_KEY = "0x4AAAAAADX6N6Hu6kGoXHYf";

function loadTurnstileScript() {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve(window.turnstile);
      return;
    }

    const existing = document.querySelector('script[data-fayt-turnstile="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.turnstile));
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.faytTurnstile = "true";

    script.onload = () => resolve(window.turnstile);
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

export default function EmailSignup() {
  const widgetRef = useRef(null);
  const widgetIdRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("beta-access");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function bootTurnstile() {
      try {
        if (
          !TURNSTILE_SITE_KEY ||
          TURNSTILE_SITE_KEY === "0x4AAAAAADX6N6Hu6kGoXHYf"
        ) {
          setStatus("error");
          setMessage("Turnstile site key is not configured.");
          return;
        }

        const turnstile = await loadTurnstileScript();

        if (cancelled || !widgetRef.current || !turnstile) {
          return;
        }

        if (widgetIdRef.current !== null) {
          return;
        }

        widgetIdRef.current = turnstile.render(widgetRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "dark",
          callback: (token) => {
            setTurnstileToken(token);
            setMessage("");
            if (status === "error") {
              setStatus("idle");
            }
          },
          "expired-callback": () => {
            setTurnstileToken("");
            setStatus("error");
            setMessage("Verification expired. Please complete the check again.");
          },
          "error-callback": () => {
            setTurnstileToken("");
            setStatus("error");
            setMessage("Verification could not load. Refresh the page and try again.");
          },
        });
      } catch (error) {
        setStatus("error");
        setMessage("Verification could not load. Refresh the page and try again.");
      }
    }

    bootTurnstile();

    return () => {
      cancelled = true;

      if (window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignore cleanup errors.
        }
      }

      widgetIdRef.current = null;
    };
  }, []);

  function resetTurnstile() {
    setTurnstileToken("");

    if (window.turnstile && widgetIdRef.current !== null) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {
        // Ignore reset errors.
      }
    }
  }

  async function submitSignup(event) {
    event.preventDefault();

    setStatus("loading");
    setMessage("");

    if (!turnstileToken) {
      setStatus("error");
      setMessage("Please complete the verification check.");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          interest,
          source: window.location.hostname || "fayt-company-site",
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Signup failed.");
      }

      setStatus("success");
      setMessage("You're on the Fayt Systems early access list.");
      setName("");
      setEmail("");
      setInterest("beta-access");
      resetTurnstile();
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Signup failed.");
      resetTurnstile();
    }
  }

  return (
    <section className="rounded-3xl border border-amber-300/20 bg-slate-950/80 p-6 shadow-2xl shadow-black/40">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
          Fayt Systems Beta
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Join the early access list
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Get product updates, demo milestones, and beta availability for Fayt’s
          market intelligence and execution infrastructure.
        </p>
      </div>

      <form onSubmit={submitSignup} className="space-y-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/60"
        />

        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          type="email"
          required
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300/60"
        />

        <select
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-300/60"
        >
          <option value="beta-access">Beta access</option>
          <option value="investor-updates">Investor updates</option>
          <option value="demo-updates">Demo updates</option>
        </select>

        <div ref={widgetRef} className="min-h-[72px]" />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-2xl bg-amber-300 px-5 py-3 font-semibold text-black shadow-lg shadow-amber-300/20 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Joining..." : "Join the early access list"}
        </button>

        {message && (
          <p
            className={
              status === "error"
                ? "text-sm text-red-300"
                : "text-sm text-emerald-300"
            }
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

