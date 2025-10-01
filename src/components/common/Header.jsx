import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navList } from "../data/Data";
import SocialIcons from "./SocialIcons";

const specialLinkStyle = {
  background: "#00b439ff ",
  color: "#ffffffff",
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
        <div className="row gx-0" style={{ display: "flex", alignItems: "center" }}>
          <div
            className="col-lg-3 bg-dark d-none d-lg-flex"
            style={{
              minWidth: "180px",
              maxWidth: "260px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              height: "72px" // keep header height smaller
            }}
          >
            <Link
              to="/"
              className="navbar-brand m-0 p-0 d-flex align-items-center justify-content-center"
              style={{ height: "72px", position: "relative" }}
            >
              <img
                src={"../assets/img/mylogo.png"}
                alt="Logo"
                style={{
                  height: "150px",    // further increased height
                  width: "320px",     // further increased width
                  objectFit: "contain",
                  padding: "0px",
                  marginTop: "-48px", // let logo overflow above header
                  marginBottom: "-32px", // let logo overflow below header
                  boxShadow: "0 2px 8px rgba(15,23,43,0.08)"
                }}
              />
            </Link>
          </div>
          <div className="col-lg-9" style={{ paddingLeft: "32px", flex: 1 }}>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
              <Link to="/" className="navbar-brand d-block d-lg-none">
                <img
                  src={"../assets/img/mylogo.png"}
                  alt="Logo"
                  style={{
                    height: "120px",    // further increased height for mobile
                    width: "240px",     // further increased width for mobile
                    objectFit: "contain",
                    padding: "0px",
                    marginTop: "-36px",
                    marginBottom: "-16px",
                    boxShadow: "0 2px 8px rgba(15,23,43,0.08)"
                  }}
                />
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                onClick={() => setNavbarCollapse(!navbarCollapse)}
                style={{ border: "2px solid #ff7f27", background: "transparent" }} // add border color
              >
                <span
                  className="navbar-toggler-icon"
                  style={{
                    filter: "invert(54%) sepia(99%) saturate(749%) hue-rotate(359deg) brightness(101%) contrast(101%)"
                    // This filter makes the default icon orange (#ff7f27)
                  }}
                ></span>
              </button>
              <div
                className={
                  navbarCollapse
                    ? "navbar-collapse justify-content-around navbarCollapse"
                    : "collapse navbar-collapse justify-content-around"
                }
                style={{ paddingLeft: "32px" }} // move nav group right
              >
                <div className="navbar-nav mr-auto py-0">
                  {/* Render HOME link first */}
                  {navList.map((item, index) => (
                    index === 0 && (
                      <div key={index}>
                        {item.subItems ? (
                          <div
                            className="nav-item dropdown"
                            onMouseEnter={() => handleMouseEnter(item.id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <Link to={item.path} className="nav-link dropdown-toggle" style={{ whiteSpace: "nowrap" }}>
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
                            className="nav-item nav-link"
                            style={{ margin: 0, borderRadius: 0, whiteSpace: "nowrap" }}
                          >
                            {item.text}
                          </Link>
                        )}
                      </div>
                    )
                  ))}
                  {/* Wrap 2nd and 3rd links in a flex container */}
                  <div style={{ display: "flex", alignItems: "center" }} className="nav-flex-group">
                    {navList.map((item, index) => (
                      <React.Fragment key={index}>
                        {(index === 1 || index === 2) ? (
                          <Link
                            to={item.path}
                            className={`nav-item nav-link special-link orange-underline nav-green-full`}
                            style={{
                              ...specialLinkStyle,
                              width: "100%",
                              display: "block",
                              ...(hoveredIndex === index ? specialLinkHoverStyle : {}),
                              ...(index === 1 ? { borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" } : {}),
                              ...(index === 2 ? { borderTopRightRadius: "8px", borderBottomRightRadius: "8px" } : {}),
                              whiteSpace: "nowrap"
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                            {item.text}
                          </Link>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                  {/* Render other links normally */}
                  {navList.map((item, index) => (
                    (index !== 0 && index !== 1 && index !== 2) && (
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
                            className="nav-item nav-link"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {item.text}
                          </Link>
                        )}
                      </div>
                    )
                  ))}
                </div>
                {/* Group SocialIcons and Sign In button in a flex container */}
                <div style={{ display: "flex", alignItems: "center", gap: "24px", marginLeft: "24px" }}>
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
                      marginLeft: "0px", // reduce margin
                      whiteSpace: "nowrap" // keep text on one line
                    }}
                    onClick={() => setShowLogin(true)}
                  >
                    Sign In
                  </button>
                </div>
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
          .nav-green-full {
            width: 100%;
            display: block;
          }
          @media (max-width: 900px) {
            .nav-flex-group {
              flex-direction: column-reverse !important;
              align-items: stretch !important;
              gap: 0 !important;
              width: 100%;
            }
            .nav-flex-group .nav-link {
              margin-bottom: 4px;
              width: 100% !important;
              border-radius: 0 !important;
            }
          }
        `}
      </style>
    </>
  );
}


