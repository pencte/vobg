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
    document.title = "Growtopia Login";

    const style = document.createElement("style");
    style.innerHTML = `
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        overflow: hidden;
        background: linear-gradient(to bottom, #4fc3ff 0%, #b3e5ff 40%, #e0f7ff 100%);
      }

      /* ☁️ clouds effect */
      body::before {
        content: "";
        position: fixed;
        width: 200%;
        height: 200%;
        background-image: radial-gradient(white 10%, transparent 11%);
        background-size: 80px 80px;
        opacity: 0.2;
        animation: moveClouds 60s linear infinite;
      }

      @keyframes moveClouds {
        from { transform: translateX(0); }
        to { transform: translateX(-400px); }
      }

      .modal {
        display: flex !important;
        align-items: center;
        justify-content: center;
      }

      .modal-dialog {
        width: 100%;
        max-width: 420px;
      }

      .modal-content {
        background: #2b2b2b;
        border: 6px solid #1a1a1a;
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      }

      .modal-body {
        padding: 20px;
      }

      .title {
        text-align: center;
        font-size: 28px;
        font-weight: 900;
        color: #fff;
        text-shadow: 2px 2px 0 #000;
        margin-bottom: 10px;
      }

      .label {
        font-size: 12px;
        color: #fff;
        margin: 6px 0;
        display: block;
        text-shadow: 1px 1px 0 #000;
      }

      .input {
        width: 100%;
        padding: 10px;
        border: 3px solid #000;
        border-radius: 6px;
        background: #fff;
        font-weight: bold;
      }

      .input:focus {
        outline: none;
        border-color: #00c2ff;
      }

      .btn {
        width: 100%;
        padding: 10px;
        border: 3px solid #000;
        border-radius: 6px;
        font-weight: 900;
        cursor: pointer;
        text-transform: uppercase;
      }

      .btn-login {
        background: linear-gradient(#00e5ff, #0099ff);
        color: white;
      }

      .btn-login:hover {
        filter: brightness(1.1);
      }

      .btn-register {
        background: linear-gradient(#7CFF6B, #3DDC84);
        color: black;
      }

      .row {
        display: flex;
        gap: 10px;
        margin-top: 10px;
      }

      .eye {
        position: absolute;
        right: 10px;
        top: 35px;
        cursor: pointer;
      }

      .pass-wrap {
        position: relative;
      }

      a {
        color: #00e5ff;
        font-weight: bold;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      .footer {
        text-align: center;
        margin-top: 10px;
        font-size: 11px;
        color: #ccc;
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
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-body">

            <div className="title">Growtopia</div>

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
                  placeholder="Enter Password"
                />
                <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                  👁️
                </span>
              </div>
            </form>

            <div className="row">
              <form ref={guestFormRef} onSubmit={handleGuestSubmit} style={{ flex: 1 }}>
                <input name="_token" type="hidden" value={token} />
                <input name="growId" type="hidden" value="" />
                <input name="password" type="hidden" value="" />

                <button className="btn btn-register">Register</button>
              </form>

              <button
                className="btn btn-login"
                style={{ flex: 1 }}
                onClick={() => loginFormRef.current?.requestSubmit()}
              >
                Login
              </button>
            </div>

            <div className="footer">
              © Growtopia Style UI Clone (inspired)
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowtopiaLogin;
