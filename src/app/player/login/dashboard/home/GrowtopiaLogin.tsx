"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const GrowtopiaLogin: React.FC = () => {
  const searchParams = useSearchParams();
  const loginFormRef = useRef<HTMLFormElement>(null);
  const guestFormRef = useRef<HTMLFormElement>(null);

  const [growId, setGrowId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ tambahan

  const token = useMemo(() => searchParams.get("data") || "", [searchParams]);

  useEffect(() => {
    setGrowId(localStorage.getItem("growId") || "");
  }, []);

  useEffect(() => {
    document.title = "Growtopia Player Support";

    const setFavicon = (href: string) => {
      const setIcon = (rel: string) => {
        let link = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null;
        if (!link) {
          link = document.createElement("link");
          link.rel = rel;
          document.head.appendChild(link);
        }
        link.href = href;
      };
      setIcon("icon");
      setIcon("shortcut icon");
    };

    const loadCSS = (href: string) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    };

    setFavicon(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/images/growtopia.ico"
    );

    loadCSS(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/faq-main.css"
    );
    loadCSS(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/shop-custom.css"
    );
    loadCSS(
      "https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/ingame-custom.css"
    );

    const style = document.createElement("style");
    style.innerHTML = `
      body {
        font-family: 'Segoe UI', sans-serif;
      }

      .modal-content {
        border-radius: 16px;
        backdrop-filter: blur(20px);
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.15);
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      }

      h2 {
        font-weight: 600;
        color: #fff;
      }

      .form-control {
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.2);
        background: rgba(255,255,255,0.08);
        color: #fff;
        transition: 0.2s;
      }

      .form-control::placeholder {
        color: rgba(255,255,255,0.6);
      }

      .form-control:focus {
        border-color: #4da6ff;
        box-shadow: 0 0 0 2px rgba(77,166,255,0.3);
        background: rgba(255,255,255,0.12);
      }

      .btn {
        border-radius: 10px;
        transition: 0.2s;
        font-weight: 500;
      }

      .btn-primary {
        background: linear-gradient(135deg, #4da6ff, #0066ff);
        border: none;
      }

      .btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(0,102,255,0.4);
      }

      .btn-secondary {
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        color: #fff;
      }

      .btn-secondary:hover {
        background: rgba(255,255,255,0.2);
      }

      .modal {
        backdrop-filter: blur(6px);
      }

      /* ✅ tambahan */
      .label-text {
        color: rgba(255,255,255,0.8);
        font-size: 13px;
        margin-bottom: 4px;
        display: block;
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
        font-size: 16px;
        color: rgba(255,255,255,0.6);
      }

      @media (max-width: 480px) {
        .modal-dialog {
          width: 95vw !important;
        }

        h2 {
          font-size: 18px !important;
        }
      }
    `;
    document.head.appendChild(style);

    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyHeight = document.body.style.height;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevHtmlHeight = document.documentElement.style.height;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.documentElement.style.height = "100%";

    const keyHandler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (
        key === "f12" ||
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && ["i", "c", "j"].includes(key)) ||
        (e.ctrlKey && key === "u")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("keydown", keyHandler);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.height = prevBodyHeight;
      document.documentElement.style.height = prevHtmlHeight;
    };
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
      <button type="button" className="btn btn-primary hidden" style={{ display: "none" }} />

      <div
        className="modal fade product-list-popup in"
        style={{
          display: "block",
          inset: 0,
          position: "fixed",
          overflow: "hidden",
          background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{
            maxWidth: 420,
            width: "92vw",
            margin: "0 auto",
          }}
        >
          <div className="modal-content">
            <div className="modal-body" style={{ padding: 20 }}>
              <div className="content">
                <section className="common-box" style={{ padding: 0 }}>
                  <div className="container" style={{ width: "100%", padding: 0 }}>
                    <div className="row" style={{ margin: 0 }}>
                      <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>
                        <div className="section-title center-align" style={{ marginBottom: 15 }}>
                          <h2>Welcome To TerorismePS</h2>
                        </div>

                        <div className="row div-content-center" style={{ margin: 0 }}>
                          <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>

                            <form
                              ref={loginFormRef}
                              method="POST"
                              action="/player/growid/login/validate"
                              acceptCharset="UTF-8"
                              role="form"
                              autoComplete="off"
                              onSubmit={handleLoginSubmit}
                            >
                              <input name="_token" type="hidden" value={token} />

                              <label className="label-text">GrowID:</label>
                              <div className="form-group">
                                <input
                                  className="form-control grow-text"
                                  placeholder="Your TerorismePS Name *"
                                  name="growId"
                                  type="text"
                                  value={growId}
                                  onChange={(e) => setGrowId(e.target.value)}
                                />
                              </div>

                              <label className="label-text">Password:</label>
                              <div className="form-group password-wrapper">
                                <input
                                  className="form-control grow-text"
                                  placeholder="Your TerorismePS Password *"
                                  name="password"
                                  type={showPassword ? "text" : "password"}
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
                              className="form-group"
                              style={{
                                display: "flex",
                                gap: 10,
                                marginTop: 10,
                              }}
                            >
                              <form
                                ref={guestFormRef}
                                method="POST"
                                action="/player/growid/login/validate"
                                acceptCharset="UTF-8"
                                role="form"
                                autoComplete="off"
                                onSubmit={handleGuestSubmit}
                                style={{ flex: 1 }}
                              >
                                <input name="_token" type="hidden" value={token} />
                                <input name="growId" type="hidden" value="" />
                                <input name="password" type="hidden" value="" />

                                <input
                                  className="btn btn-secondary grow-button"
                                  type="submit"
                                  value="Register"
                                  style={{ width: "100%", height: 42 }}
                                />
                              </form>

                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  loginFormRef.current?.requestSubmit();
                                }}
                                className="btn btn-primary grow-button"
                                style={{ flex: 1, height: 42 }}
                              >
                                Login
                              </button>
                            </div>

                            {/* DISCORD + CREDIT */}
                            <div style={{ marginTop: 15, textAlign: "center" }}>
                              <a
                                href="https://discord.gg/vaFUAhDfUH"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: "block",
                                  color: "#4da6ff",
                                  textDecoration: "none",
                                  fontSize: 14,
                                  marginBottom: 5,
                                }}
                              >
                                Join our Discord 🚀
                              </a>

                              <div
                                style={{
                                  fontSize: 12,
                                  color: "rgba(255,255,255,0.5)",
                                }}
                              >
                                by Test
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrowtopiaLogin;
