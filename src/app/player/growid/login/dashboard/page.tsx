"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div style={{
      height: "100vh",
      background: "radial-gradient(circle at top, #0b1220, #050816)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "Segoe UI"
    }}>
      <h1 style={{ fontSize: 28 }}>🌍 TerorismePS Dashboard</h1>

      <div style={{
        marginTop: 10,
        padding: 10,
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 10,
        background: "rgba(255,255,255,0.05)"
      }}>
        <p>Welcome</p>
        <h2>{session?.user?.growId}</h2>
      </div>
    </div>
  );
}
