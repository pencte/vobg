"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const GrowtopiaLogin: React.FC = () => {
  const searchParams = useSearchParams();
  const loginFormRef = useRef<HTMLFormElement>(null);
  const guestFormRef = useRef<HTMLFormElement>(null);

  const [growId, setGrowId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const token = useMemo(() => searchParams.get("data") || "", [searchParams]);

  useEffect(() => {
    setGrowId(localStorage.getItem("growId") || "");
  }, []);

  useEffect(() => {
    document.title = "Growtopia Player Support";

    const style = document.createElement("style");
    style.innerHTML = `
      body {
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
        overflow: hidden;
        background: linear-gradient(-45deg, #0f172a, #1e3a8a, #0ea5e9, #22c55e);
        background-size: 400% 400%;
        animation: gradientBG 12s ease infinite;
      }

      @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .modal {
        display: flex !important;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
      }

      .modal-dialog {
        width: 100%;
        max-width: 420px;
      }

      .modal-content {
        border-radius: 20px;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.2);
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        backdrop-filter: blur(25px);
        overflow: hidden;
      }

      .section-title h2 {
        text-align: center;
        font-size: 28px;
        font-weight: 800;
        background: linear-gradient(90deg, #00f5ff, #3b82f6, #22c55e);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 15px;
        text-shadow: 0 0 20px rgba(0,200,255,0.3);
      }

      .label-text {
        color: rgba(255,255,255,0.8);
        font-size: 13px;
        margin-bottom: 5px;
        display: block;
      }

      .form-control {
        width: 100%;
        padding: 11px 12px;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.2);
        background: rgba(255,255,255,0.08);
        color: #fff;
        outline: none;
        transition: 0.25s;
        box-shadow: inset 0 0 10px rgba(255,255,255,0.05);
      }

      .form-control:focus {
        border-color: #00c6ff;
        box-shadow: 0 0 15px rgba(0,198,255,0.4);
        background: rgba(255,255,255,0.12);
      }

      .btn {
        border-radius: 12px;
        font-weight: 700;
        transition: 0.2s;
        cursor: pointer;
      }

      .btn-primary {
        background: linear-gradient(135deg, #00c6ff, #0072ff, #00ff95);
        background-size: 200% 200%;
        color: white;
        border: none;
        animation: btnGlow 5s ease infinite;
      }

      @keyframes btnGlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0,150,255,0.5);
      }

      .btn-secondary {
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        color: #fff;
      }

      .btn-secondary:hover {
        background: rgba(255,255,255,0.2);
      }

      .password-wrapper {
        position: relative;
      }

      .toggle-eye {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: rgba(255,255,255,0.7);
      }

      a {
        transition: 0.2s;
      }

      a:hover {
        text-shadow: 0 0 10px rgba(0,200,255,0.6);
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
    <div className="modal fade in" style={{ display: "flex" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body" style={{ padding: 26 }}>

            <div className="section-title">
              <h2>TerorismePS</h2>
            </div>

            <form ref={loginFormRef} onSubmit={handleLoginSubmit}>
              <input name="_token" type="hidden" value={token} />

              <label className="label-text">GrowID</label>
              <input
                className="form-control"
                placeholder="Enter your ID"
                value={growId}
                onChange={(e) => setGrowId(e.target.value)}
              />

              <div style={{ height: 10 }} />

              <label className="label-text">Password</label>
              <div className="password-wrapper">
                <input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="toggle-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </form>

            <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
              <form ref={guestFormRef} onSubmit={handleGuestSubmit} style={{ flex: 1 }}>
                <input name="_token" type="hidden" value={token} />
                <input name="growId" type="hidden" value="" />
                <input name="password" type="hidden" value="" />

                <input
                  className="btn btn-secondary"
                  type="submit"
                  value="Register"
                  style={{ width: "100%", height: 44 }}
                />
              </form>

              <button
                className="btn btn-primary"
                style={{ flex: 1, height: 44 }}
                onClick={() => loginFormRef.current?.requestSubmit()}
              >
                Login
              </button>
            </div>

            <div style={{ textAlign: "center", marginTop: 18 }}>
              <a href="https://discord.gg/vaFUAhDfUH" target="_blank">
                Join Discord 🚀
              </a>

              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                by Test
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowtopiaLogin;
