import React, { useRef, useState } from "react";
import Header from '../common/Header';
import CommonHeading from '../common/CommonHeading';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { rtdb } from '../../firebase/firebase';
import { ref, push } from "firebase/database";
import { tripPlanningImages, tourPackages } from '../data/Data';
import DreamTripSVG from './yBhAn901.svg';
import emailjs from 'emailjs-com';
import { useNavigate } from "react-router-dom";
import SocialIcons2 from "../home/SocialIcons";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1, 
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3500
};

const ArrowButton = ({ direction, onClick }) => (
  <button
    style={{
      position: "absolute",
      top: "50%",
      [direction === "left" ? "left" : "right"]: "16px",
      transform: "translateY(-50%)",
      background: "rgba(49,121,122,0.85)",
      border: "none",
      borderRadius: "50%",
      width: "44px",
      height: "44px",
      color: "#fff",
      fontSize: "1.8rem",
      cursor: "pointer",
      zIndex: 2,
      boxShadow: "0 2px 8px rgba(49,121,122,0.18)"
    }}
    onClick={onClick}
    aria-label={direction === "left" ? "Previous" : "Next"}
  >
    {direction === "left" ? "‹" : "›"}
  </button>
);

const EMAILJS_SERVICE_ID = 'service_0gmvl4o';
const EMAILJS_TEMPLATE_ID = 'template_qodp4ef';
const EMAILJS_USER_ID = 'R_CMaLVBqicquTPm8';

const TripPlanning = () => {
  const sliderRef = useRef();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '', 
    phone: '',
    travelers: '',
    date: '',
    message: '' 
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAfterChange = idx => setCurrent(idx);

  // Handle card selection
  const handleSelect = (idx) => {
    setSelected(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  // Calculate total price (example: sum all selected package prices)
  const totalPrice = selected.reduce((sum, idx) => {
    const pkg = tourPackages[idx];
    return sum + (pkg ? parseFloat(pkg.price) : 0);
  }, 0);

  // Handle form input change
  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Simple form validation
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name required';
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Valid email required';
    if (!form.phone.match(/^\+?\d{7,}$/)) newErrors.phone = 'Valid phone required';
    if (!form.travelers || isNaN(form.travelers) || form.travelers < 1) newErrors.travelers = 'Enter number of travelers';
    if (!form.date) newErrors.date = 'Travel date required';
    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setSubmitted(true);
      setLoading(true);
      const details = {
        selectedPackages: selected.map(idx => tourPackages[idx].days + " Days: " + tourPackages[idx].routes.join(", ")),
        totalPrice,
        ...form,
        createdAt: new Date().toISOString()
      };
      let rtdbSuccess = false;
      try {
        await push(ref(rtdb, "tripQuotations"), details);
        rtdbSuccess = true;

        // Send email via EmailJS
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            type: 'trip_planning_booking',
            name: form.name,
            contact: form.phone,
            email: "akilanirmalzz4352@gmail.com",
            packages: details.selectedPackages.join(', '),
            totalPrice: totalPrice,
            travelers: form.travelers,
            date: form.date,
            message: form.message
          },
          EMAILJS_USER_ID
        );
      } catch (err) {
        rtdbSuccess = false;
      }
      setLoading(false);
      if (rtdbSuccess) {
        alert("Our team will contact you within 1 hour.");
      } else {
        alert("Failed to send quotation. Please try again.");
      }
    }
  };

  // Handle Quotation button click
  const handleQuotationClick = () => {
    setShowPopup(true);
    setSubmitted(false);
    setErrors({});
  };

  return (
    <><SocialIcons2/>
      <Header />
      {/* Carousel at the top */}
      <div style={{ width: "100vw", margin: "0 auto", marginTop: "0px", position: "relative" }}>
        {/* Dark filter overlay */}
        <div
          className="carousel-dark-filter"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "480px",
            background: "rgba(15,23,43,0.55)",
            zIndex: 2,
            pointerEvents: "none"
          }}
        />
        {/* Remove dark background from text, use CommonHeading */}
        <div style={{
          position: "absolute",
          top: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          width: "100vw",
          display: "flex",
          justifyContent: "center"
        }}>
          <div style={{ width: "auto" }}>
          <CommonHeading
            heading="Trip Quotation"
            title="choose your package"
            subtitle={<span style={{ color: "white" }}>Explore Our Packages</span>}
          />
          </div>
        </div>
        <div className="carousel" style={{
          width: "100vw",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          position: "relative",
          maxWidth: "none",
          margin: "0 auto"
        }}>
          <ArrowButton direction="left" onClick={() => sliderRef.current.slickPrev()} />
          <ArrowButton direction="right" onClick={() => sliderRef.current.slickNext()} />
          <Slider
            {...sliderSettings}
            ref={sliderRef}
            afterChange={handleAfterChange}
          >
            {tripPlanningImages.map((item, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                <img
                  src={item.img}
                  alt={`Trip slide ${idx + 1}`}
                  style={{
                    width: "100vw",
                    height: "480px",
                    objectFit: "cover",
                    borderRadius: "32px"
                  }}
                />
                {/* Remove dark background from carousel caption */}
                <div style={{
                  position: "absolute",
                  bottom: "32px",
                  left: "32px",
                  color: "#fff",
                  padding: "18px 32px",
                  borderRadius: "18px",
                  minWidth: "220px",
                  boxShadow: "0 2px 12px rgba(49,121,122,0.18)",
                  zIndex: 3,
                  background: "transparent"
                }}>
                  <div style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: "6px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "1.15rem", fontWeight: 400 }}>
                    {item.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* Cards for tour packages */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2rem",
          maxWidth: "1400px",
          paddingLeft: "40px",
          paddingRight: "40px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "32px",
        }}
      >
        {tourPackages.map((pkg, idx) => (
          <div
            key={idx}
            className={`trip-card${selected.includes(idx) ? ' selected' : ''}`}
            style={{
              borderRadius: "1rem",
              boxShadow: selected.includes(idx)
                ? "0 12px 32px rgba(255,152,0,0.25), 0 4px 24px rgba(0,0,0,0.12)"
                : "0 2px 12px rgba(0,0,0,0.10)",
              overflow: "hidden",
              position: "relative",
              minHeight: "480px",
              height: "100%",
              background: `url(${pkg.image}) center/cover no-repeat`,
              display: "flex",
              flexDirection: "column",
              transition: "box-shadow 0.2s, transform 0.2s",
              border: "none",
            }}
            onClick={() => handleSelect(idx)}
          >
            {/* Gradient overlay for bottom half */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "50%",
                pointerEvents: "none",
                zIndex: 1,
                borderRadius: "0 0 1rem 1rem",
                background:
                  "linear-gradient(to bottom, rgba(30,30,30,0.0) 0%, rgba(30,30,30,0.45) 40%, rgba(30,30,30,0.85) 100%)",
              }}
            />
            {/* Overlay for content and checkbox */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                minHeight: "180px",
                background:
                  "linear-gradient(180deg, rgba(30,30,30,0.0) 0%, rgba(30,30,30,0.78) 100%)",
                color: "#fff",
                padding: "32px 18px 18px 18px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                zIndex: 2,
              }}
            >
              {/* Checkbox */}
              <label
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  zIndex: 2,
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(idx)}
                  onChange={e => {
                    e.stopPropagation();
                    handleSelect(idx);
                  }}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "28px",
                    height: "28px",
                    background: selected.includes(idx) ? "#ff9800" : "#fff",
                    border: "2px solid #ff9800",
                    borderRadius: "50%",
                    position: "relative",
                    transition: "background 0.2s",
                    cursor: "pointer",
                  }}
                >
                  {selected.includes(idx) && (
                    <span
                      style={{
                        position: "absolute",
                        left: "8px",
                        top: "5px",
                        width: "8px",
                        height: "14px",
                        border: "solid #fff",
                        borderWidth: "0 3px 3px 0",
                        transform: "rotate(45deg)",
                      }}
                    ></span>
                  )}
                </span>
              </label>
              {/* Card content */}
              <div style={{ padding: 0, flex: 1, display: "flex", flexDirection: "column" }}>
                <h2 className="card-days" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.7rem", color: "#fff" }}>
                  {pkg.days} Days
                </h2>
                <div className="card-budget" style={{ fontWeight: "bold", color: "#fff", marginBottom: "0.5rem" }}>Budget</div>
                <div className="card-routes" style={{ marginBottom: "0.5rem" }}>
                  <span style={{ color: "#FEA116", fontWeight: "bold" }}>Routes:</span>
                  <span style={{ marginLeft: "8px" }}>{pkg.routes.join(" ")}</span>
                </div>
                <div className="card-inclusions" style={{ marginBottom: "1rem" }}>
                  <span style={{ color: "#FEA116", fontWeight: "bold" }}>Inclusions:</span>
                  <span style={{ marginLeft: "8px" }}>{pkg.inclusions.join(" ")}</span>
                </div>
                <div className="card-price" style={{ fontSize: "1.1rem", fontWeight: 500, color: "#ff9800" }}>
                  USD {pkg.price}
                </div>
                <div className="card-actions" style={{ display: "flex", gap: "12px", marginTop: "18px", flexWrap: "wrap" }}>
                  <button
                    style={{
                      background: "#ff9800",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      flex: 1
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      setSelected([idx]);
                      handleQuotationClick();
                    }}
                  >
                    Quotation
                  </button>
                  <button
                    className="card-view-btn"
                    style={{
                      background: "#0F172B",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      flex: 1
                    }}
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/tour-details${idx + 1}`);
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Selected summary and Quotation button */}
      <div style={{
        maxWidth: "900px",
        margin: "2rem auto 2.5rem auto",
        background: "#f7faf9",
        borderRadius: "0.7rem",
        padding: "1.2rem"
      }}>
        <h3 style={{ fontSize: "1.2rem", color: "#2d3a3a" }}>Selected Packages:</h3>
        <ul style={{ margin: "0.5rem 0 1rem 0", paddingLeft: "1.2rem" }}>
          {selected.length === 0 ? <li>None selected</li> :
            selected.map(idx => <li key={idx}>{tourPackages[idx].days} Days: {tourPackages[idx].routes.join(", ")}</li>)
          }
        </ul>
        <div style={{ fontSize: "1.1rem", color: "#ff9800" }}>
          <strong>Total Price:</strong> ${totalPrice.toLocaleString()}
        </div>
        <button
          style={{
            background: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.9rem 2rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "16px",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          onClick={handleQuotationClick}
        >
          Quotation
        </button>
      </div>
      {/* Quotation Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "32px 24px",
              minWidth: "350px",
              width: "100%",
              maxWidth: "600px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column"
            }}
            onClick={e => e.stopPropagation()}
          >
            <CommonHeading heading="Trip Quotation"
              title="choose your package"
              subtitle="Explore Our Packages" />
            <div style={{ marginBottom: "8px", color: "#0F172B", fontWeight: "bold", fontSize: "1.2rem" }}>
              <strong>Selected Packages:</strong>
              <ul style={{ paddingLeft: "18px", margin: "4px 0" }}>
                {selected.length === 0 ? <li>None selected</li> :
                  selected.map(idx => <li key={idx} style={{ color: "#ff9800", fontWeight: "bold" }}>{tourPackages[idx].days} Days: {tourPackages[idx].routes.join(", ")}</li>)
                }
              </ul>
            </div>
            <div style={{ marginBottom: "8px", color: "#0F172B", fontWeight: "bold", fontSize: "1.2rem" }}>
              <strong>Total Price:</strong> ${totalPrice.toLocaleString()}
            </div>
            {/* Info form inside popup */}
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "100%", margin: "8px 0" }}>
                  <label style={{ textAlign: "center", display: "block" }}>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleFormChange}
                    className={errors.name ? 'error' : ''}
                    style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", textAlign: "center" }}
                  />
                  {errors.name && <span style={{ color: "#e25d5d", fontSize: "0.9rem" }}>{errors.name}</span>}
                </div>
                <div style={{ width: "100%", margin: "8px 0" }}>
                  <label style={{ textAlign: "center", display: "block" }}>Contact Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter contact number"
                    value={form.phone}
                    onChange={handleFormChange}
                    className={errors.phone ? 'error' : ''}
                    style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", textAlign: "center" }}
                  />
                  {errors.phone && <span style={{ color: "#e25d5d", fontSize: "0.9rem" }}>{errors.phone}</span>}
                </div>
                <div style={{ width: "100%", margin: "8px 0" }}>
                  <label style={{ textAlign: "center", display: "block" }}>Gmail Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Gmail address"
                    value={form.email}
                    onChange={handleFormChange}
                    className={errors.email ? 'error' : ''}
                    style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", textAlign: "center" }}
                  />
                  {errors.email && <span style={{ color: "#e25d5d", fontSize: "0.9rem" }}>{errors.email}</span>}
                </div>
                <div style={{ width: "100%", margin: "8px 0" }}>
                  <label style={{ textAlign: "center", display: "block" }}>Number of Travelers</label>
                  <input
                    type="number"
                    name="travelers"
                    placeholder="Number of Travelers"
                    min="1"
                    value={form.travelers}
                    onChange={handleFormChange}
                    className={errors.travelers ? 'error' : ''}
                    style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", textAlign: "center" }}
                  />
                  {errors.travelers && <span style={{ color: "#e25d5d", fontSize: "0.9rem" }}>{errors.travelers}</span>}
                </div>
                <div style={{ width: "100%", margin: "8px 0" }}>
                  <label style={{ textAlign: "center", display: "block" }}>Travel Date</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleFormChange}
                    className={errors.date ? 'error' : ''}
                    style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", textAlign: "center" }}
                  />
                  {errors.date && <span style={{ color: "#e25d5d", fontSize: "0.9rem" }}>{errors.date}</span>}
                </div>
                <div style={{ width: "100%", margin: "8px 0" }}>
                  <label style={{ textAlign: "center", display: "block" }}>Message</label>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={form.message}
                    onChange={handleFormChange}
                    style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", textAlign: "center" }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button
                  type="button"
                  style={{
                    background: "#ff9800",
                    color: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    flex: 1
                  }}
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  style={{
                    background: "#0F172B",
                    color: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    flex: 1
                  }}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
              {submitted && <div style={{ marginTop: "1.2rem", color: "#ff9800", fontWeight: "500" }}>Thank you! We will contact you soon.</div>}
            </form>
          </div>
        </div>
      )}
      {/* Minimal responsive styles */}
      <style>{`
        .trip-card.selected {
          box-shadow: 0 12px 32px rgba(255,152,0,0.25), 0 4px 24px rgba(0,0,0,0.12);
        }
        .trip-card {
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .trip-card:hover {
          box-shadow: 0 12px 32px rgba(0,0,0,0.18);
          transform: translateY(-6px) scale(1.03);
        }
        @media (max-width: 900px) {
          .carousel img {
            height: 320px !important;
          }
          .trip-card {
            grid-template-columns: 1fr !important;
          }
          .carousel-dark-filter {
            height: 320px !important;
          }
          /* Reduce gap between cards */
          [style*="display: grid"] {
            gap: 1rem !important;
            padding-left: 10px !important;
            padding-right: 10px !important;
          }
          /* Stack buttons vertically inside card */
          .card-actions {
            flex-direction: column !important;
            gap: 8px !important;
            margin-top: 12px !important;
          }
          .card-view-btn {
            margin-top: 0 !important;
          }
          /* Responsive card text */
          .card-days {
            font-size: 1.1rem !important;
          }
          .card-budget,
          .card-routes,
          .card-inclusions,
          .card-price {
            font-size: 0.95rem !important;
          }
        }
        @media (max-width: 600px) {
          .card-days {
            font-size: 1rem !important;
          }
          .card-budget,
          .card-routes,
          .card-inclusions,
          .card-price {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default TripPlanning;