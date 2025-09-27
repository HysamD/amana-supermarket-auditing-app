import { Link, Route, Routes } from "react-router-dom";
    import { useState } from "react";

    function Header() {
      return (
        <header style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 16px", background: "#64A70B", color: "#fff"
        }}>
          <img src="/icons/icon-192x192.png" width={28} height={28} alt="Amana" />
          <strong>Amana Supermarket Auditing App</strong>
          <nav style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
            <Link to="/" style={{ color: "#fff" }}>Dashboard</Link>
            <Link to="/stores" style={{ color: "#fff" }}>Stores</Link>
            <Link to="/audit" style={{ color: "#fff" }}>Audit</Link>
            <Link to="/login" style={{ color: "#fff" }}>Login</Link>
          </nav>
        </header>
      );
    }

    function Dashboard() {
      return (
        <section style={{ padding: 16 }}>
          <h2>Main Dashboard</h2>
          <p>KPIs, recent audits, and quick links.</p>
        </section>
      );
    }

    function Stores() {
      return (
        <section style={{ padding: 16 }}>
          <h2>Store Selection</h2>
          <ul>
            <li>Amana — Dearborn #101</li>
            <li>Amana — Chicago #204</li>
            <li>Amana — Houston #309</li>
          </ul>
        </section>
      );
    }

    function Audit() {
      const [qty, setQty] = useState(0);
      return (
        <section style={{ padding: 16 }}>
          <h2>Product Auditing</h2>
          <label>
            Luncheon Meat — 12 oz &nbsp;
            <input
              type="number"
              value={qty}
              onChange={e => setQty(parseInt(e.target.value || "0"))}
              style={{ width: 80 }}
            />
          </label>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => alert(`Saved qty: ${qty}`)}
              style={{ padding: "10px 14px", borderRadius: 12, background: "#64A70B", color: "#fff", border: "none" }}>
              Save
            </button>
          </div>
        </section>
      );
    }

    function Login() {
      return (
        <section style={{ padding: 16 }}>
          <h2>Login</h2>
          <input placeholder="Email" style={{ display: "block", marginBottom: 8, padding: 10, width: 280 }} />
          <input type="password" placeholder="Password" style={{ display: "block", marginBottom: 8, padding: 10, width: 280 }} />
          <button style={{ padding: "10px 14px", borderRadius: 12, background: "#64A70B", color: "#fff", border: "none" }}>
            Sign in
          </button>
        </section>
      );
    }

    export default function App() {
      return (
        <div style={{ fontFamily: "system-ui, sans-serif" }}>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      );
    }
