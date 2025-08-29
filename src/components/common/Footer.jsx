import { Link } from "react-router-dom";
import { footerItem } from "../data/Data";
import Newsletter from "../home/Newsletter";

function AkilaContact() {
  return (
    <div className="bg-secondary rounded p-4 h-100">
      <h6 className="section-title text-start text-warning text-uppercase mb-4">
        CONTACT{" "}
        <span className="text-white" style={{ fontWeight: "bold" }}>
          ────
        </span>
      </h6>
      <h6
        className="text-white text-uppercase mb-3"
        style={{ fontWeight: "bold" }}
      >
        SOFTWARE COMPANY: AKILA NIRMAL
      </h6>
      <div className="mb-2">
        <span style={{ verticalAlign: "middle", marginRight: 8 }}>
          {/* WhatsApp SVG */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill="currentColor"
            style={{
              color: "#25D366",
              verticalAlign: "middle",
            }}
          >
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.583 2.236 6.364L4 29l7.636-2.236A11.96 11.96 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.83-.58-5.393-1.58l-.384-.24-4.533 1.33 1.33-4.533-.24-.384A9.96 9.96 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.43c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.09-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.27-.48.09-.19.04-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.54-.45-.47-.61-.48-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.81 1.16 3c.14.19 2.01 3.07 4.87 4.18.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
          </svg>
        </span>
        <span style={{ verticalAlign: "middle" }}>0725845841</span>
      </div>
      <div className="mb-2">
        <span style={{ verticalAlign: "middle", marginRight: 8 }}>
          {/* Gmail SVG */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill="currentColor"
            style={{
              color: "#EA4335",
              verticalAlign: "middle",
            }}
          >
            <path d="M27 7H5c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h22c1.104 0 2-.896 2-2V9c0-1.104-.896-2-2-2zm0 2v2.236l-11 7.334-11-7.334V9h22zm-22 14V12.236l10.447 6.96c.34.227.766.227 1.106 0L27 12.236V23H5z" />
          </svg>
        </span>
        <span style={{ verticalAlign: "middle" }}>
          akilanirmal2020@gmail.com
        </span>
      </div>
      <div className="mb-2">
        <span style={{ verticalAlign: "middle", marginRight: 8 }}>
          {/* LinkedIn SVG */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill="currentColor"
            style={{
              color: "#0077B5",
              verticalAlign: "middle",
            }}
          >
            <path d="M29 0H3C1.343 0 0 1.343 0 3v26c0 1.657 1.343 3 3 3h26c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3zM9.339 27H5.669V12.667h3.67V27zm-1.835-16.333c-1.175 0-2.13-.955-2.13-2.13s.955-2.13 2.13-2.13c1.175 0 2.13.955 2.13 2.13s-.955 2.13-2.13 2.13zM27 27h-3.667v-6.667c0-1.587-.028-3.633-2.217-3.633-2.22 0-2.561 1.732-2.561 3.527V27h-3.667V12.667h3.52v1.963h.05c.49-.927 1.687-1.904 3.475-1.904 3.719 0 4.406 2.448 4.406 5.633V27z" />
          </svg>
        </span>
        <a
          href="https://www.linkedin.com/in/akilanirmal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
          style={{ textDecoration: "underline" }}
        >
          LinkedIn
        </a>
      </div>
      <div className="mt-3 text-white">Contact us for your web solution</div>
    </div>
  );
}

function ClientDetails() {
  return (
    <div className="bg-secondary rounded p-4 h-100 mt-4 mb-3">
      <h6 className="section-title text-start text-success text-uppercase mb-3">
        CLIENT DETAILS
      </h6>
      <div className="mb-2">
        <span style={{ verticalAlign: "middle", marginRight: 8 }}>
          {/* User SVG */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill="currentColor"
            style={{
              color: "#28a745",
              verticalAlign: "middle",
            }}
          >
            <path d="M16 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0 2c-5.33 0-16 2.668-16 8v4h32v-4c0-5.332-10.67-8-16-8z" />
          </svg>
        </span>
        <span style={{ verticalAlign: "middle" }}>Client Name: John Doe</span>
      </div>
      <div className="mb-2">
        <span style={{ verticalAlign: "middle", marginRight: 8 }}>
          {/* Email SVG */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill="currentColor"
            style={{
              color: "#28a745",
              verticalAlign: "middle",
            }}
          >
            <path d="M27 7H5c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h22c1.104 0 2-.896 2-2V9c0-1.104-.896-2-2-2zm0 2v2.236l-11 7.334-11-7.334V9h22zm-22 14V12.236l10.447 6.96c.34.227.766.227 1.106 0L27 12.236V23H5z" />
          </svg>
        </span>
        <span style={{ verticalAlign: "middle" }}>johndoe@email.com</span>
      </div>
    </div>
  );
}

export default function Footer(props) {
  return (
    <footer id="footer" className="footer-section">
      <Newsletter />
      <div
        className="container-fluid bg-dark text-light footer wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container pb-5">
          <div className="row g-5">
            <div className="col-md-6 col-lg-4">
              <div className="bg-primary rounded p-4 h-100">
                <Link to="/">
                  <h1 className="text-white text-uppercase mb-3">travelers</h1>
                </Link>
                <p className="text-white mb-0">
                  Build a professional website for your hotel business and grab
                  the attention of new visitors upon your site’s launch.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 d-flex flex-column align-items-stretch">
              <ClientDetails />
              <AkilaContact />
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="row gy-5 g-4">
                {footerItem.map((section, sectionIndex) => (
                  <div className="col-12" key={sectionIndex}>
                    <h6 className="section-title text-start text-warning text-uppercase mb-4">
                      {section.header}{" "}
                      <span className="text-white" style={{ fontWeight: "bold" }}>
                        ────
                      </span>
                    </h6>
                    {section.UnitItem.map((item, itemIndex) => (
                      <a
                        className="btn btn-link text-white"
                        href=""
                        key={itemIndex}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

