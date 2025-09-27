import { useState } from "react";

    export default function App() {
      const [count, setCount] = useState(0);
      return (
        <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
          <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/icons/icon-192x192.png" width={36} height={36} alt="Amana" />
            <h1 style={{ margin: 0 }}>Amana Supermarket Auditing App</h1>
          </header>

          <p style={{ opacity: 0.8 }}>
            Starter scaffold with PWA, Vite + React + TS. Replace with your full app.
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => setCount((c) => c + 1)}>
              Clicks: {count}
            </button>
            <a href="/manifest.webmanifest" target="_blank" rel="noreferrer">Manifest</a>
          </div>
        </div>
      );
    }
