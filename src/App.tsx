// D:\CryptoTrader\fayt-company-site\src\App.tsx

const DEMO_URL = import.meta.env.VITE_DEMO_URL || "https://demo.faytsystems.com";
const BETA_URL = import.meta.env.VITE_BETA_URL || "https://beta.faytsystems.com";

const PUBLIC_DEMO_WORDING =
  "Live Coinbase Advanced market data with simulated paper execution.";

const BETA_WORDING =
  "Customer-funded Coinbase Advanced beta using locally stored customer API credentials and customer-side execution agents.";

const navItems = [
  ["Command", "#command"],
  ["Demo", "#demo"],
  ["Proof", "#proof"],
  ["Risk", "#risk"],
  ["Technology", "#technology"],
  ["Investor", "#investor"],
  ["Beta", "#beta"],
];

const proofMetrics = [
  ["350", "validated paper trades"],
  ["349", "closed paper trades"],
  ["345", "winning paper trades"],
  ["+$4,691.65", "simulated closed PnL"],
  ["98.85%", "closed paper win rate"],
  ["15.64%", "paper return on $30k"],
];

const trustCards = [
  ["Separation", "Company site, public demo, and beta portal are separate surfaces with different security boundaries."],
  ["Transparency", "Public paper telemetry is visible through a dedicated live demo path."],
  ["No Custody", "Real-money beta users keep funds in their own Coinbase Advanced accounts."],
  ["No API Upload", "The beta website does not ask users to upload Coinbase API secrets."],
  ["Local Agents", "Customer-side execution agents keep credentials on the userâ€™s machine."],
  ["Proof Layer", "Performance claims are framed with audit context, simulation status, and guardrail language."],
];

const architecture = [
  ["01", "Market Data", "Live market data is observed through dedicated market-data infrastructure and surfaced safely through the public demo."],
  ["02", "Signal Intelligence", "Market behavior, events, regimes, and symbol context are transformed into reviewable decision evidence."],
  ["03", "Bucket Validation", "Execution candidates are grouped, tested, inspected, and promoted only after validation criteria are met."],
  ["04", "Risk Gate", "Allowlist checks, position sizing, open-trade limits, and execution boundaries sit in front of action."],
  ["05", "Telemetry", "Trades, events, equity movement, market-board state, and risk posture are made visible for review."],
  ["06", "Customer-Side Beta", "Real-money beta execution belongs to local customer agents using locally stored credentials."],
];

const investorPoints = [
  "Public company site separated from public paper demo.",
  "Cloudflare Pages deployment path active for always-on static sites.",
  "Live demo wording preserved and separated from real-money beta language.",
  "Beta portal designed for verified access and no API-secret upload.",
  "Real-money beta architecture based on customer-side local execution.",
  "Proof and risk sections designed for executive review.",
];

function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#command" aria-label="Fayt Systems home">
        <span className="crest">
          <span>FS</span>
        </span>
        <span>
          <strong>FAYT SYSTEMS</strong>
          <small>Execution Intelligence</small>
        </span>
      </a>

      <nav aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a href={href} key={href}>{label}</a>
        ))}
      </nav>

      <div className="navActions">
        <a className="glassBtn" href={DEMO_URL}>Live Demo</a>
        <a className="goldBtn" href={BETA_URL}>Join Beta</a>
      </div>
    </header>
  );
}

function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="sectionTitle">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

function CommandChart() {
  return (
    <div className="terminal">
      <div className="terminalTop">
        <span>FAYT COMMAND CENTER</span>
        <strong>EXECUTION INTELLIGENCE</strong>
      </div>

      <svg viewBox="0 0 920 420" role="img" aria-label="Fayt market telemetry visualization">
        <defs>
          <linearGradient id="heroLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#58d8ff" />
            <stop offset="52%" stopColor="#83a9ff" />
            <stop offset="100%" stopColor="#ffd66e" />
          </linearGradient>
          <linearGradient id="heroArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(88,216,255,.35)" />
            <stop offset="100%" stopColor="rgba(88,216,255,0)" />
          </linearGradient>
        </defs>

        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h-${i}`} x1="44" x2="876" y1={58 + i * 48} y2={58 + i * 48} className="gridLine" />
        ))}

        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`v-${i}`} y1="42" y2="350" x1={72 + i * 112} x2={72 + i * 112} className="gridLine faint" />
        ))}

        <path
          className="chartArea"
          d="M 48 314 C 118 276, 174 260, 240 266 C 322 274, 350 178, 436 184 C 508 190, 536 126, 604 142 C 684 160, 724 82, 798 98 C 844 108, 858 78, 876 66 L 876 350 L 48 350 Z"
        />
        <path
          className="chartLine"
          d="M 48 314 C 118 276, 174 260, 240 266 C 322 274, 350 178, 436 184 C 508 190, 536 126, 604 142 C 684 160, 724 82, 798 98 C 844 108, 858 78, 876 66"
        />

        <circle cx="876" cy="66" r="9" className="pulse" />

        <g className="signalNodes">
          <circle cx="240" cy="266" r="5" />
          <circle cx="436" cy="184" r="5" />
          <circle cx="604" cy="142" r="5" />
          <circle cx="798" cy="98" r="5" />
        </g>
      </svg>

      <div className="terminalFoot">
        <div>
          <span>Public Demo</span>
          <strong>Paper Sim</strong>
        </div>
        <div>
          <span>Beta Model</span>
          <strong>Local Agent</strong>
        </div>
        <div>
          <span>Security</span>
          <strong>No API Upload</strong>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="site">
      <div className="mesh meshA" />
      <div className="mesh meshB" />
      <div className="noise" />

      <Header />

      <section className="hero" id="command">
        <div className="heroCopy">
          <p className="eyebrow">Fayt Systems / Boardroom Execution Intelligence</p>
          <h1>Digital asset execution infrastructure built for proof, discipline, and real-time transparency.</h1>
          <p className="lede">
            Fayt Systems is building an executive-grade intelligence layer for digital asset markets:
            live market observation, proof dashboards, risk controls, beta onboarding, customer-side execution,
            and boardroom-ready operating evidence.
          </p>

          <div className="heroDisclosure">
            <strong>{PUBLIC_DEMO_WORDING}</strong>
            <span>Temporary paper activity mode is enabled for non-certified current-bucket testing.</span>
          </div>

          <div className="heroActions">
            <a className="primaryBtn" href={DEMO_URL}>View Public Demo</a>
            <a className="secondaryBtn" href={BETA_URL}>Join Beta Launch</a>
            <a className="ghostBtn" href="#investor">Investor Snapshot</a>
          </div>

          <div className="domainRail">
            <div>
              <span>Company</span>
              <strong>faytsystems.com</strong>
            </div>
            <div>
              <span>Demo</span>
              <strong>demo.faytsystems.com</strong>
            </div>
            <div>
              <span>Beta</span>
              <strong>beta.faytsystems.com</strong>
            </div>
          </div>
        </div>

        <aside className="heroVisual">
          <CommandChart />
          <div className="executiveStatus">
            <span className="statusDot" />
            <div>
              <strong>Clean domain separation is active.</strong>
              <p>Company brand, public paper demo, and real-money beta onboarding each have their own surface.</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="trustStrip" aria-label="Trust architecture">
        <div>Boardroom-grade brand</div>
        <div>Dedicated paper demo</div>
        <div>Verified beta portal</div>
        <div>No API secret upload</div>
        <div>Customer-side execution</div>
        <div>No Fayt custody</div>
      </section>

      <section className="section splitSection" id="demo">
        <SectionTitle
          eyebrow="Public Demo"
          title="A live telemetry surface, not a trading-control panel."
          body="The public demo remains separate from the real-money beta. It exists to show market-data-driven paper activity, proof-oriented telemetry, and risk posture without exposing broker controls."
        />

        <div className="wideCallout">
          <div>
            <span>Public wording</span>
            <strong>{PUBLIC_DEMO_WORDING}</strong>
          </div>
          <a className="primaryBtn compact" href={DEMO_URL}>Open Demo</a>
        </div>
      </section>

      <section className="section" id="proof">
        <SectionTitle
          eyebrow="Proof Layer"
          title="Performance claims should be inspectable."
          body="The Fayt proof model connects outcomes to rules: market data, event logic, bucket validation, risk controls, paper-sim records, and reviewable telemetry."
        />

        <div className="metricGrid">
          {proofMetrics.map(([value, label]) => (
            <article className="metric" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>

        <div className="proofPanel">
          <p className="eyebrow">Guardrail Context</p>
          <h3>Proof is not a screenshot. Proof is an evidence chain.</h3>
          <p>
            Faytâ€™s public materials should clearly distinguish paper-sim validation from real-money beta usage.
            The company site can show paper proof, but the real-money beta must remain bounded by user-controlled
            accounts, local credentials, and documented risk acknowledgements.
          </p>
        </div>
      </section>

      <section className="section" id="risk">
        <SectionTitle
          eyebrow="Risk Architecture"
          title="Control before scale."
          body="Faytâ€™s product direction is risk-first: no custody, no web-based API secret upload, no public trade controls, and real-money beta execution through customer-side local agents."
        />

        <div className="cardGrid">
          {trustCards.map(([title, body]) => (
            <article className="card" key={title}>
              <span>â—‡</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="technology">
        <SectionTitle
          eyebrow="Technology"
          title="Separate the surfaces. Protect the execution path."
          body="The top-tier architecture separates brand, public proof, beta onboarding, and customer-side execution. Each surface has a narrower responsibility and cleaner risk boundary."
        />

        <div className="flow">
          {architecture.map(([num, title, body]) => (
            <article className="flowNode" key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section investor" id="investor">
        <SectionTitle
          eyebrow="Investor Snapshot"
          title="A disciplined execution intelligence company for digital asset markets."
          body="Fayt is positioned around operating evidence: proof dashboards, risk boundaries, public telemetry, beta onboarding, and customer-side execution infrastructure."
        />

        <div className="investorGrid">
          <article className="panel">
            <p className="eyebrow">Problem</p>
            <h3>Fragmented trading tools create weak evidence.</h3>
            <p>
              Traders and early-stage funds often rely on exchange dashboards, spreadsheets,
              screenshots, and opaque bots. Fayt is being designed to turn execution into inspectable infrastructure.
            </p>
          </article>

          <article className="panel">
            <p className="eyebrow">Solution</p>
            <h3>Unify signals, controls, and boardroom proof.</h3>
            <p>
              Fayt connects market observation, signal intelligence, risk controls, paper proof,
              beta onboarding, and user-side execution agents into one disciplined product path.
            </p>
          </article>

          <article className="panel large">
            <p className="eyebrow">Current Build Signals</p>
            <ul>
              {investorPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section betaSection" id="beta">
        <SectionTitle
          eyebrow="Beta Users"
          title="The real-money beta belongs on a verified, separate portal."
          body={BETA_WORDING}
        />

        <div className="betaCard">
          <div>
            <h3>Free 30-day beta. No first-beta payment. No API secret upload.</h3>
            <p>
              The beta portal handles email verification, acknowledgements, local setup instructions,
              and launch-day readiness. It does not become the public paper demo and does not collect Coinbase API secrets.
            </p>
          </div>
          <a className="primaryBtn" href={BETA_URL}>Open Beta Portal</a>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>Fayt Systems</strong>
          <span>Execution Intelligence / Proof Infrastructure / Beta Operations</span>
        </div>
        <p>
          Public demo: {PUBLIC_DEMO_WORDING} Real-money beta: {BETA_WORDING}
          Not financial advice. Digital asset trading involves risk.
        </p>
      </footer>
    </main>
  );
}

export default App;