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

const styles = {
  card: {
    width: "100%",
    maxWidth: "520px",
    boxSizing: "border-box",
    border: "1px solid rgba(255, 214, 110, 0.22)",
    borderRadius: "28px",
    background: "linear-gradient(145deg, rgba(6, 18, 38, 0.96), rgba(8, 13, 26, 0.92))",
    boxShadow: "0 30px 90px rgba(0, 0, 0, 0.42)",
    padding: "28px",
    overflow: "hidden",
  },
  eyebrow: {
    margin: "0 0 10px",
    color: "#ffd66e",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.26em",
    textTransform: "uppercase",
  },
  title: {
    margin: "0",
    color: "#ffffff",
    fontSize: "clamp(28px, 4vw, 46px)",
    lineHeight: "1.02",
    letterSpacing: "-0.055em",
    fontWeight: 850,
  },
  body: {
    margin: "14px 0 22px",
    color: "rgba(226, 232, 240, 0.8)",
    fontSize: "15px",
    lineHeight: "1.65",
  },
  form: {
    display: "grid",
    gap: "12px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.055)",
    color: "#ffffff",
    padding: "13px 14px",
    fontSize: "15px",
    outline: "none",
  },
  select: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "16px",
    background: "rgba(10, 20, 38, 0.98)",
    color: "#ffffff",
    padding: "13px 14px",
    fontSize: "15px",
    outline: "none",
  },
  turnstileWrap: {
    minHeight: "76px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  button: {
    width: "100%",
    border: "0",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #ffd66e, #ffb84d)",
    color: "#080d1a",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: 850,
    cursor: "pointer",
    boxShadow: "0 18px 40px rgba(255, 214, 110, 0.22)",
  },
  buttonDisabled: {
    opacity: 0.62,
    cursor: "not-allowed",
  },
  success: {
    margin: "2px 0 0",
    color: "#7fffc3",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  error: {
    margin: "2px 0 0",
    color: "#ff9b9b",
    fontSize: "14px",
    lineHeight: "1.5",
  },
};

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
        if (!TURNSTILE_SITE_KEY || TURNSTILE_SITE_KEY.includes("PASTE")) {
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
            setStatus("idle");
            setMessage("");
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
      } catch {
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

  const buttonStyle =
    status === "loading"
      ? { ...styles.button, ...styles.buttonDisabled }
      : styles.button;

  return (
    <section style={styles.card}>
      <div>
        <p style={styles.eyebrow}>Fayt Systems Beta</p>

        <h2 style={styles.title}>Join the early access list</h2>

        <p style={styles.body}>
          Get product updates, demo milestones, and beta availability for Fayt's
          market intelligence and execution infrastructure.
        </p>
      </div>

      <form onSubmit={submitSignup} style={styles.form}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          autoComplete="name"
          style={styles.input}
        />

        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
          style={styles.input}
        />

        <select
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          style={styles.select}
        >
          <option value="beta-access">Beta access</option>
          <option value="investor-updates">Investor updates</option>
          <option value="demo-updates">Demo updates</option>
        </select>

        <div style={styles.turnstileWrap}>
          <div ref={widgetRef} />
        </div>

        <button type="submit" disabled={status === "loading"} style={buttonStyle}>
          {status === "loading" ? "Joining..." : "Join the early access list"}
        </button>

        {message && (
          <p style={status === "error" ? styles.error : styles.success}>
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
