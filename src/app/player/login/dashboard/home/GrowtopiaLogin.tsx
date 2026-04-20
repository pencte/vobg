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
        background: radial-gradient(circle at top, #1b2a4a, #05070f);
        overflow: hidden;
      }

      .modal {
        display: flex !important;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(8px);
      }

      .modal-dialog {
        width: 100%;
        max-width: 420px;
      }

      .modal-content {
        border-radius: 18px;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 0 40px rgba(0,150,255,0.15);
        backdrop-filter: blur(25px);
        overflow: hidden;
      }

      .section-title h2 {
        text-align: center;
        font-size: 26px;
        font-weight: 700;
        background: linear-gradient(90deg,#4da6ff,#00e0ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 10px;
      }

      .label-text {
        color: rgba(255,255,255,0.75);
        font-size: 13px;
        margin-bottom: 5px;
        display: block;
      }

      .form-control {
        width: 100%;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.15);
        background: rgba(255,255,255,0.07);
        color: #fff;
        outline: none;
        transition: 0.2s;
      }

      .form-control:focus {
        border-color: #4da6ff;
        box-shadow: 0 0 0 2px rgba(77,166,255,0.25);
        background: rgba(255,255,255,0.12);
      }

      .btn {
        border-radius: 10px;
        font-weight: 600;
        transition: 0.2s;
      }

      .btn-primary {
        background: linear-gradient(135deg,#4da6ff,#0077ff);
        border: none;
        color: #fff;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0,120,255,0.35);
      }

      .btn-secondary {
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.15);
        color: #fff;
      }

      .btn-secondary:hover {
        background: rgba(255,255,255,0.15);
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
        color: rgba(255,255,255,0.6);
      }

      a {
        transition: 0.2s;
      }

      a:hover {
        opacity: 0.8;
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
    <>
      <div className="modal fade in" style={{ display: "flex" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body" style={{ padding: 24 }}>
              <div className="section-title">
                <h2>TerorismePS</h2>
              </div>

              <form
                ref={loginFormRef}
                method="POST"
                action="/player/growid/login/validate"
                onSubmit={handleLoginSubmit}
              >
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
                    placeholder="Enter your password"
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

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 15,
                }}
              >
                <form
                  ref={guestFormRef}
                  method="POST"
                  action="/player/growid/login/validate"
                  onSubmit={handleGuestSubmit}
                  style={{ flex: 1 }}
                >
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
                  onClick={() => loginFormRef.current?.requestSubmit()}
                  className="btn btn-primary"
                  style={{ flex: 1, height: 42 }}
                >
                  Login
                </button>
              </div>

              <div style={{ textAlign: "center", marginTop: 15 }}>
                <a
                  href="https://discord.gg/vaFUAhDfUH"
                  target="_blank"
                  style={{ color: "#4da6ff", fontSize: 14 }}
                >
                  Join Discord 🚀
                </a>

                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  by Test
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrowtopiaLogin;
