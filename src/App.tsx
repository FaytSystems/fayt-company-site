// D:\CryptoTrader\fayt-company-site\src\App.tsx

const DEMO_URL = import.meta.env.VITE_DEMO_URL || "https://demo.faytsystems.com";
const BETA_URL = import.meta.env.VITE_BETA_URL || "https://beta.faytsystems.com";

const proofMetrics = [
  ["350", "validated paper trades"],
  ["349", "closed paper trades"],
  ["345", "winning trades"],
  ["+$4,691.65", "simulated closed PnL"],
  ["98.85%", "closed paper win rate"],
  ["15.64%", "paper return"],
];

function App() {
  return (
    <main className="site">
      <div className="glow glowA" />
      <div className="glow glowB" />

      <header className="topbar">
        <a className="brand" href="#home">
          <span className="crest">FS</span>
          <span>
            <strong>FAYT SYSTEMS</strong>
            <small>Execution Intelligence</small>
          </span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#proof">Proof</a>
          <a href="#risk">Risk</a>
          <a href="#technology">Technology</a>
          <a href="#investor">Investor</a>
          <a href="#beta">Beta</a>
        </nav>

        <div className="navActions">
          <a className="ghostBtn" href={DEMO_URL}>Live Demo</a>
          <a className="goldBtn" href={BETA_URL}>Join Beta</a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="heroCopy">
          <p className="eyebrow">Fayt Systems / Digital Asset Execution Intelligence</p>
          <h1>Execution infrastructure built for proof, discipline, and real-time transparency.</h1>
          <p className="lede">
            Fayt Systems is building a high-integrity execution intelligence platform for digital asset markets â€”
            combining live market observation, risk controls, paper-sim validation, audit trails, beta onboarding,
            and boardroom-ready telemetry.
          </p>

          <div className="domainMap">
            <div>
              <span>Company Website</span>
              <strong>faytsystems.com</strong>
            </div>
            <div>
              <span>Public Read-Only Demo</span>
              <strong>demo.faytsystems.com</strong>
            </div>
            <div>
              <span>Beta Tester Portal</span>
              <strong>beta.faytsystems.com</strong>
            </div>
          </div>

          <div className="actions">
            <a className="primaryBtn" href={DEMO_URL}>View Public Demo</a>
            <a className="secondaryBtn" href={BETA_URL}>Join Beta Launch</a>
            <a className="ghostBtn" href="#investor">Investor Snapshot</a>
          </div>
        </div>

        <div className="heroVisual">
          <div className="terminal">
            <div className="terminalTop">
              <span>FAYT COMMAND CENTER</span>
              <strong>Boardroom Telemetry Layer</strong>
            </div>

            <svg viewBox="0 0 900 390" role="img" aria-label="Fayt dashboard visual">
              <defs>
                <linearGradient id="line" x1="0" x2="1">
                  <stop offset="0%" stopColor="#58d8ff" />
                  <stop offset="55%" stopColor="#7caaff" />
                  <stop offset="100%" stopColor="#ffd66e" />
                </linearGradient>
                <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(88,216,255,.34)" />
                  <stop offset="100%" stopColor="rgba(88,216,255,0)" />
                </linearGradient>
              </defs>

              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`h-${i}`} x1="40" x2="860" y1={55 + i * 50} y2={55 + i * 50} className="gridLine" />
              ))}

              {Array.from({ length: 7 }).map((_, i) => (
                <line key={`v-${i}`} y1="40" y2="330" x1={80 + i * 120} x2={80 + i * 120} className="gridLine faint" />
              ))}

              <path
                className="chartArea"
                d="M 45 292 C 120 250, 170 240, 230 248 C 305 258, 330 172, 420 176 C 500 180, 520 106, 600 124 C 688 144, 720 78, 790 91 C 825 98, 845 76, 860 64 L 860 330 L 45 330 Z"
              />
              <path
                className="chartLine"
                d="M 45 292 C 120 250, 170 240, 230 248 C 305 258, 330 172, 420 176 C 500 180, 520 106, 600 124 C 688 144, 720 78, 790 91 C 825 98, 845 76, 860 64"
              />
              <circle cx="860" cy="64" r="8" className="pulse" />
            </svg>
          </div>

          <div className="statusCard">
            <span className="statusDot" />
            <div>
              <strong>Public demo stays separate.</strong>
              <p>Live Coinbase Advanced market data with simulated paper execution.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="strip">
        <div>Company site</div>
        <div>Separate demo</div>
        <div>Separate beta portal</div>
        <div>No API secret upload</div>
        <div>Customer-side agents</div>
        <div>Boardroom proof layer</div>
      </section>

      <section className="section" id="proof">
        <p className="eyebrow">Proof Layer</p>
        <h2>Performance claims should be inspectable.</h2>
        <p className="lede">
          Fayt is designed to connect outcomes to rules: data source, event logic, bucket selection,
          risk control, trade record, and performance outcome.
        </p>

        <div className="metricGrid">
          {proofMetrics.map(([value, label]) => (
            <div className="metric" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="risk">
        <p className="eyebrow">Risk Architecture</p>
        <h2>Control before scale.</h2>
        <p className="lede">
          The public demo is paper-simulated. Real-money beta access belongs in the separate beta portal
          and should use customer-side local agents with user-controlled Coinbase credentials.
        </p>

        <div className="cardGrid">
          {[
            ["No Fayt custody", "Users keep funds in their own Coinbase Advanced accounts."],
            ["No API upload", "The website never asks users to upload Coinbase API secrets."],
            ["Local execution agent", "Real-money beta execution runs from the customer side."],
            ["Kill-switch posture", "Live orders should stay disabled until launch-day checks pass."],
            ["Risk caps", "Max open trades, notional limits, and daily loss limits should be local guardrails."],
            ["Audit events", "Every access, verification, policy, and trade-intent event should be recorded."],
          ].map(([title, body]) => (
            <article className="card" key={title}>
              <span>â—‡</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="technology">
        <p className="eyebrow">Technology</p>
        <h2>From market data to decision evidence.</h2>

        <div className="flow">
          {[
            ["01", "Market Data", "Live Coinbase Advanced market data remains surfaced through the dedicated public demo."],
            ["02", "Signal Layer", "The system evaluates symbol behavior, event conditions, and market structure."],
            ["03", "Bucket Intelligence", "Candidate execution conditions are organized into reviewable decision buckets."],
            ["04", "Risk Gate", "Open-trade limits, sizing, allowlists, and order-permission boundaries are checked before action."],
            ["05", "Telemetry", "Trades, events, equity, market-board data, and risk state are made visible through dashboards."],
            ["06", "Beta Agent", "Real-money beta execution is designed around customer-side local agents and locally stored credentials."],
          ].map(([num, title, body]) => (
            <article className="flowNode" key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="investor">
        <p className="eyebrow">Investor Snapshot</p>
        <h2>A disciplined execution intelligence company.</h2>

        <div className="twoCol">
          <article className="panel">
            <p className="eyebrow">Problem</p>
            <h3>Fragmented tools create weak evidence.</h3>
            <p>
              Traders and early-stage funds often rely on exchange dashboards, spreadsheets, screenshots,
              and opaque bots. The result is weak risk governance and limited proof.
            </p>
          </article>

          <article className="panel">
            <p className="eyebrow">Solution</p>
            <h3>Unify intelligence, controls, and evidence.</h3>
            <p>
              Fayt connects signal intelligence, risk controls, paper validation, public telemetry,
              beta onboarding, and customer-side execution into one disciplined product path.
            </p>
          </article>
        </div>
      </section>

      <section className="section beta" id="beta">
        <p className="eyebrow">Beta Users</p>
        <h2>Real-money beta access belongs on a separate portal.</h2>
        <p className="lede">
          The first beta should be free for 30 days. Users trade with their own Coinbase Advanced account
          and their own funds. Fayt does not collect payment for the first beta and does not collect Coinbase
          API secrets on the website.
        </p>

        <a className="primaryBtn" href={BETA_URL}>Open Beta Portal</a>
      </section>

      <footer className="footer">
        <strong>Fayt Systems</strong>
        <p>
          Public demo: live Coinbase Advanced market data with simulated paper execution. Real-money beta:
          customer-funded Coinbase Advanced beta using locally stored customer API credentials and customer-side execution agents.
        </p>
      </footer>
    </main>
  );
}

export default App;
