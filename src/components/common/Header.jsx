import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navList } from "../data/Data";
import SocialIcons from "./SocialIcons";

const specialLinkStyle = {
  background: "rgba(184, 218, 255, 1)",
  color: "#0F172B",
  fontWeight: "bold",
  boxShadow: "0 2px 8px rgba(15,23,43,0.08)",
  padding: "8px 20px",
  transition: "color 0.2s, background 0.2s",
  margin: 0,
  borderRadius: 0
};

const specialLinkHoverStyle = {
  color: "#ff7f27", // orange
};

export default function Header() {
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleMouseEnter = (itemId) => {
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "dspl@1234") {
      setShowLogin(false);
      setError("");
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  // Smooth scroll handler for anchor links
  const handleAnchorClick = (e, path) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const anchor = path.replace("#", "");
      if (location.pathname !== "/") {
        // If not on home, navigate to home then scroll after navigation
        navigate("/", { state: { scrollTo: anchor } });
      } else {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <div className="container-fluid bg-dark px-0">
        <div className="row gx-0">
          <div className="col-lg-3 bg-dark d-none d-lg-block">
            <Link
              to="/"
              className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
            >
              <h1 className="m-0 text-primary text-uppercase">travelers</h1>
            </Link>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
              <Link to="/" className="navbar-brand d-block d-lg-none">
                <h1 className="m-0 text-primary text-uppercase">travelers</h1>
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                onClick={() => setNavbarCollapse(!navbarCollapse)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={
                  navbarCollapse
                    ? "navbar-collapse justify-content-around navbarCollapse"
                    : "collapse navbar-collapse justify-content-around"
                }
              >
                <div className="navbar-nav mr-auto py-0">
                  {navList.map((item, index) => (
                    <div key={index}>
                      {item.subItems ? (
                        <div
                          className="nav-item dropdown"
                          onMouseEnter={() => handleMouseEnter(item.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Link to={item.path} className="nav-link dropdown-toggle">
                            {item.text}
                          </Link>
                          <div
                            className={`dropdown-menu rounded-0 m-0 ${
                              activeDropdown === item.id ? "show" : ""
                            }`}
                          >
                            {item.subItems.map((sub) =>
                              sub.path.startsWith("#") ? (
                                <a
                                  href={sub.path}
                                  className="dropdown-item"
                                  key={sub.id}
                                  onClick={(e) => handleAnchorClick(e, sub.path)}
                                >
                                  {sub.text}
                                </a>
                              ) : (
                                <Link to={sub.path} className="dropdown-item" key={sub.id}>
                                  {sub.text}
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          className={`nav-item nav-link${(index === 1 || index === 2) ? " special-link orange-underline" : ""}`}
                          style={
                            (index === 1 || index === 2)
                              ? {
                                  ...specialLinkStyle,
                                  ...(index === 1 ? { borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" } : {}),
                                  ...(index === 2 ? { borderTopRightRadius: "8px", borderBottomRightRadius: "8px" } : {}),
                                  ...(hoveredIndex === index ? specialLinkHoverStyle : {})
                                }
                              : (index === 0
                                  ? { margin: 0, borderRadius: 0 }
                                  : undefined)
                          }
                          onMouseEnter={() => {
                            if (index === 1 || index === 2) setHoveredIndex(index);
                          }}
                          onMouseLeave={() => {
                            if (index === 1 || index === 2) setHoveredIndex(null);
                          }}
                        >
                          {item.text}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                <SocialIcons />
                {/* Sign In button */}
                <button
                  style={{
                    background: "#0F172B",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginLeft: "1px"
                  }}
                  onClick={() => setShowLogin(true)}
                >
                  <>
                    Sign <br/>In
                  </>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* Login Popup */}
      {showLogin && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowLogin(false)}
        >
          <div
            style={{
              background: "#ffffffff",
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              padding: "32px 24px",
              minWidth: "320px",
              maxWidth: "90vw",
              textAlign: "center",
              border: "1px solid #e5e5e5",
              position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{marginBottom: "16px", color: "#0F172B"}}>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                required
                style={{
                  width: "90%",
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                style={{
                  width: "90%",
                  marginBottom: "16px",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              />
              {error && <div style={{ color: "#e25d5d", marginBottom: "10px" }}>{error}</div>}
              <button
                type="submit"
                style={{
                  background: "#0F172B",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "1rem",
                  marginRight: "10px",
                }}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                style={{
                  background: "#eee",
                  color: "#333",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <style>
        {`
          .special-link:hover {
            color: #ff7f27 !important;
            background: #ffe8b7ff !important;
          }
          .orange-underline {
            position: relative;
            z-index: 1;
          }
          .orange-underline::after {
            content: "";
            position: absolute;
            left: 16px;
            right: 16px;
            bottom: 6px;
            height: 3px;
            background: linear-gradient(90deg, #ff7f27 60%, #ff0055 100%);
            border-radius: 2px;
            transform: scaleX(0);
            transition: transform 0.35s cubic-bezier(.4,0,.2,1);
            z-index: 2;
          }
          .orange-underline:hover::after {
            transform: scaleX(1);
          }
        `}
      </style>
    </>
  );
}
