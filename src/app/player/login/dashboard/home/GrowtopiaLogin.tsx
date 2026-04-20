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
        background: linear-gradient(135deg, #0b1220, #111a2e);
        overflow: hidden;
      }

      .modal {
        display: flex !important;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(12px);
        background: rgba(0,0,0,0.35);
      }

      .modal-dialog {
        width: 100%;
        max-width: 420px;
      }

      .modal-content {
        border-radius: 18px;
        background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        backdrop-filter: blur(20px);
      }

      .section-title h2 {
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: 1px;
        margin-bottom: 18px;
      }

      .label-text {
        color: rgba(255,255,255,0.7);
        font-size: 12px;
        margin-bottom: 5px;
        display: block;
      }

      .form-control {
        width: 100%;
        padding: 11px 12px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.15);
        background: rgba(255,255,255,0.06);
        color: #fff;
        outline: none;
        transition: 0.2s;
      }

      .form-control:focus {
        border-color: rgba(100,200,255,0.8);
        box-shadow: 0 0 0 2px rgba(100,200,255,0.2);
        background: rgba(255,255,255,0.09);
      }

      .btn {
        border-radius: 10px;
        font-weight: 600;
        transition: 0.2s;
      }

      .btn-primary {
        background: linear-gradient(90deg, #2563eb, #1d4ed8);
        border: none;
        color: white;
      }

      .btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 25px rgba(37,99,235,0.35);
      }

      .btn-secondary {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.12);
        color: #fff;
      }

      .btn-secondary:hover {
        background: rgba(255,255,255,0.12);
      }

      .password-wrapper {
        position: relative;
      }

      .toggle-eye {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        opacity: 0.7;
      }

      a {
        color: #60a5fa;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
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
          <div className="modal-body" style={{ padding: 24 }}>

            <div className="section-title">
              <h2>TerorismePS</h2>
            </div>

            <form ref={loginFormRef} onSubmit={handleLoginSubmit}>
              <input name="_token" type="hidden" value={token} />

              <label className="label-text">GrowID</label>
              <input
                className="form-control"
                value={growId}
                onChange={(e) => setGrowId(e.target.value)}
                placeholder="Enter ID"
              />

              <div style={{ height: 10 }} />

              <label className="label-text">Password</label>
              <div className="password-wrapper">
                <input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
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
                  style={{ width: "100%", height: 42 }}
                />
              </form>

              <button
                className="btn btn-primary"
                style={{ flex: 1, height: 42 }}
                onClick={() => loginFormRef.current?.requestSubmit()}
              >
                Login
              </button>
            </div>

            <div style={{ textAlign: "center", marginTop: 15 }}>
              <a href="https://discord.gg/vaFUAhDfUH" target="_blank">
                Join Discord
              </a>

              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
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
