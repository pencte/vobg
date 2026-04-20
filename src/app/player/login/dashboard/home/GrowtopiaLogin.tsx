"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const GrowtopiaLogin: React.FC = () => {
  const searchParams = useSearchParams();
  const loginFormRef = useRef<HTMLFormElement>(null);
  const guestFormRef = useRef<HTMLFormElement>(null);

  const [screen, setScreen] = useState<"menu" | "growid">("menu");

  const [growId, setGrowId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const token = useMemo(() => searchParams.get("data") || "", [searchParams]);

  useEffect(() => {
    setGrowId(localStorage.getItem("growId") || "");

    const style = document.createElement("style");
    style.innerHTML = `
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(180deg, #0b1220, #111827);
      }

      .wrap {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .card {
        width: 360px;
        background: #111827;
        border: 1px solid #1f2937;
        border-radius: 14px;
        padding: 22px;
        color: white;
      }

      .title {
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 18px;
      }

      .btn {
        width: 100%;
        padding: 12px;
        border-radius: 10px;
        border: none;
        font-weight: 700;
        cursor: pointer;
        margin-top: 10px;
      }

      .google {
        background: white;
        color: black;
      }

      .growid {
        background: #22c55e;
        color: black;
      }

      .back {
        background: transparent;
        border: 1px solid #374151;
        color: white;
      }

      .label {
        font-size: 12px;
        color: #9ca3af;
        margin: 8px 0 4px;
        display: block;
      }

      .input {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid #374151;
        background: #0b1220;
        color: white;
        outline: none;
      }

      .input:focus {
        border-color: #3b82f6;
      }

      .pass-wrap {
        position: relative;
      }

      .eye {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        color: #9ca3af;
      }

      .row {
        display: flex;
        gap: 10px;
        margin-top: 12px;
      }

    `;
    document.head.appendChild(style);

    return () => {};
  }, []);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (growId.trim() && password.trim()) {
      localStorage.setItem("growId", growId);
      loginFormRef.current?.submit();
    }
  };

  const handleGuestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("growId", "");
    guestFormRef.current?.submit();
  };

  return (
    <div className="wrap">
      <div className="card">

        {/* ================= MENU ================= */}
        {screen === "menu" && (
          <>
            <div className="title">TerorismePS</div>

            <button className="btn google">
              Login Google
            </button>

            <button
              className="btn growid"
              onClick={() => setScreen("growid")}
            >
              Login GrowID
            </button>
          </>
        )}

        {/* ================= GROWID LOGIN ================= */}
        {screen === "growid" && (
          <>
            <div className="title">Login GrowID</div>

            <form ref={loginFormRef} onSubmit={handleLoginSubmit}>
              <input name="_token" type="hidden" value={token} />

              <label className="label">GrowID</label>
              <input
                className="input"
                value={growId}
                onChange={(e) => setGrowId(e.target.value)}
                placeholder="Enter GrowID"
              />

              <label className="label">Password</label>
              <div className="pass-wrap">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                  👁
                </span>
              </div>
            </form>

            <div className="row">
              <button
                className="btn back"
                onClick={() => setScreen("menu")}
              >
                Back
              </button>

              <button
                className="btn growid"
                onClick={() => loginFormRef.current?.requestSubmit()}
              >
                Login
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default GrowtopiaLogin;
