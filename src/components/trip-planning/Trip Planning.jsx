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
import { tripPlanningImages } from '../data/Data';
import DreamTripSVG from './yBhAn901.svg';

const images = tripPlanningImages;

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

const TripPlanning = () => {
  const sliderRef = useRef();
  const [current, setCurrent] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    destinations: "",
    duration: "",
    date: new Date(),
    name: "",
    contact: "",
    email: ""
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAfterChange = idx => setCurrent(idx);

  // Handle form input change
  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Handle Quotation button click
  const handleQuotationClick = () => {
    setShowPopup(true);
  };

  // Handle submit: send to Firebase
  const handleSubmit = async e => {
    e.preventDefault();
    // Minimal validation
    if (
      !form.destinations.trim() ||
      !form.duration.trim() ||
      !form.date ||
      !form.name.trim() ||
      !form.contact.trim() ||
      !form.email.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await push(ref(rtdb, "tripQuotations"), {
        ...form,
        date: form.date.toLocaleDateString(),
        createdAt: new Date().toISOString(),
        timestamp: Date.now()
      });
      setLoading(false);
      setShowPopup(false);
      alert("We received your quotation. We will contact you within 2 hours.");
      // Optionally reset form
      setForm({
        destinations: "",
        duration: "",
        date: new Date(),
        name: "",
        contact: "",
        email: ""
      });
    } catch (err) {
      setLoading(false);
      alert("Failed to submit quotation. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="trip-planning-main" style={{
        display: "flex",
        alignItems: "flex-start",
        minHeight: "100vh",
        background: "#faf8f2",
        marginTop: 0,
        paddingTop: 0
      }}>
        {/* Left side: Info */}
        <div className="trip-planning-left" style={{ flex: 1, padding: "2rem 2rem 0 2rem", maxWidth: "540px" }}>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 700, color: "#222", marginBottom: "0.5rem" }}>
            Plan your dream trip <span style={{ color: "#31797a" }}>together</span>
          </h1>
          <p style={{ fontSize: "1.25rem", color: "#444", marginBottom: "2rem" }}>
            Share a link with your travel companions and start your travel brainstorming session now — no signup needed.
          </p>
          <div style={{
            border: "2px solid #31797a",
            borderRadius: "16px",
            background: "#fff",
            maxWidth: "370px",
            marginBottom: "1.5rem",
            padding: 0,
            overflow: "hidden"
          }}>
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1.5px solid #31797a" }}>
              <span style={{ color: "#7bbf6a", fontWeight: "bold", fontSize: "1.1rem" }}>Destinations</span>
              <div style={{ fontSize: "1.15rem", marginTop: "0.2rem", fontWeight: 600 }}>
                <input
                  type="text"
                  name="destinations"
                  value={form.destinations}
                  onChange={handleFormChange}
                  placeholder="Enter destinations (e.g. Tokyo, Paris, Hawaii)"
                  style={{
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#222"
                  }}
                  required
                />
              </div>
            </div>
            <div style={{ display: "flex", borderTop: "none" }}>
              <div style={{ flex: 1, borderRight: "1.5px solid #31797a", padding: "1rem 1.5rem" }}>
                <span style={{ color: "#7bbf6a", fontWeight: "bold", fontSize: "1.1rem" }}>Duration of Trip</span>
                <div style={{ fontSize: "1.1rem", marginTop: "0.2rem", fontWeight: 600 }}>
                  <input
                    type="text"
                    name="duration"
                    value={form.duration}
                    onChange={handleFormChange}
                    placeholder="e.g. 7 days"
                    style={{
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "#222"
                    }}
                    required
                  />
                </div>
              </div>
              <div style={{ flex: 1, padding: "1rem 1.5rem" }}>
                <span style={{ color: "#7bbf6a", fontWeight: "bold", fontSize: "1.1rem" }}>Trip Date</span>
                <div style={{ fontSize: "1.1rem", marginTop: "0.2rem", fontWeight: 600 }}>
                  <input
                    type="text"
                    value={form.date.toLocaleDateString()}
                    readOnly
                    onClick={() => setShowCalendar(true)}
                    style={{
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "#222",
                      cursor: "pointer"
                    }}
                    required
                  />
                  {showCalendar && (
                    <div style={{ position: "absolute", zIndex: 10 }}>
                      <Calendar
                        onChange={d => {
                          setForm(f => ({ ...f, date: d }));
                          setShowCalendar(false);
                        }}
                        value={form.date}
                        minDate={new Date()}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "1.2rem", fontSize: "1.15rem", color: "#222" }}>
            <span style={{ fontStyle: "italic" }}>7 days free — <span style={{ textDecoration: "line-through", color: "#888" }}>$6/trip</span></span>
          </div>
          <button
            style={{
              background: "#ff9800",
              color: "#fff",
              border: "none",
              borderRadius: "14px",
              padding: "1rem 2.5rem",
              fontSize: "1.2rem",
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: "1.2rem",
              boxShadow: "0 2px 8px rgba(49,121,122,0.08)"
            }}
            onClick={handleQuotationClick}
          >
            Quotation
          </button>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#31797a", marginTop: "1.2rem", display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
            <span style={{ fontWeight: 700 }}>23,511</span>
            <span style={{ color: "#31797a", fontWeight: 400 }}>travelers</span>
            <span style={{ color: "#222", fontWeight: 400 }}>started here</span>
          </div>
         
        </div>
        
        {/* SVG Image in the middle */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "2rem 1rem",
          minWidth: "200px"
        }}>
          <img 
            src={DreamTripSVG} 
            alt="Dream Trip" 
            style={{ 
              width: "200px", 
              height: "320px",
              objectFit: "contain",
              marginTop: "550px",
              marginLeft: "-400px" // move image a little to the left
            }} 
          />
        </div>
        
        {/* Right side: Carousel */}
        <div className="trip-planning-right" style={{
          flex: 1,
          minWidth: "440px", // increased minWidth
          padding: "0",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start"
        }}>
          <div className="carousel" style={{
            width: "100%",
            borderRadius: "32px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            position: "relative",
            maxWidth: "900px" // increased maxWidth
          }}>
            {/* Arrow buttons */}
            <ArrowButton direction="left" onClick={() => sliderRef.current.slickPrev()} />
            <ArrowButton direction="right" onClick={() => sliderRef.current.slickNext()} />
            <Slider
              {...sliderSettings}
              ref={sliderRef}
              afterChange={handleAfterChange}
            >
              {images.map((item, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <img
                    src={item.img}
                    alt={`Trip slide ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "800px", // increased height
                      objectFit: "cover",
                      borderRadius: "32px"
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    bottom: "32px",
                    left: "32px",
                    background: "rgba(49,121,122,0.85)",
                    color: "#fff",
                    padding: "18px 32px",
                    borderRadius: "18px",
                    minWidth: "220px",
                    boxShadow: "0 2px 12px rgba(49,121,122,0.18)"
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
            {/* Side thumbnails below main image */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "-48px",
              position: "relative",
              zIndex: 3
            }}>
              {images.map((item, idx) => (
                <img
                  key={idx}
                  src={item.img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => sliderRef.current.slickGoTo(idx)}
                  style={{
                    width: "92px", // increased width
                    height: "76px", // increased height
                    objectFit: "cover",
                    borderRadius: "12px",
                    border: idx === current ? "3px solid #31797a" : "2px solid #fff",
                    boxShadow: idx === current ? "0 2px 8px #31797a44" : "0 2px 8px #0002",
                    cursor: "pointer",
                    opacity: idx === current ? 1 : 0.7,
                    transition: "border 0.2s, opacity 0.2s"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
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
            <CommonHeading heading="Trip Quotation" />
            <div style={{ marginBottom: "8px" }}>
              <strong>Destinations:</strong> {form.destinations}
            </div>
            <div style={{ marginBottom: "8px" }}>
              <strong>Duration of Trip:</strong> {form.duration}
            </div>
            <div style={{ marginBottom: "8px" }}>
              <strong>Trip Date:</strong> {form.date.toLocaleDateString()}
            </div>
            <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
              <div style={{ marginBottom: "12px" }}>
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #eee", marginTop: "4px" }}
                />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label>Contact Number *</label>
                <input
                  type="tel"
                  name="contact"
                  value={form.contact}
                  onChange={handleFormChange}
                  required
                  style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #eee", marginTop: "4px" }}
                />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                  style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #eee", marginTop: "4px" }}
                />
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
                  disabled={loading}
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
                  {loading ? "Submitting..." : "Submit Quotation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Minimal responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .trip-planning-main {
            flex-direction: column;
            padding: 1rem 0;
            align-items: flex-start;
          }
          .trip-planning-left, .trip-planning-right {
            max-width: 100%;
            padding: 2rem 1rem 0 1rem;
          }
          .carousel img {
            height: 480px !important; /* increased responsive height */
          }
          .carousel {
            max-width: 100vw !important;
          }
        }
      `}</style>
    </>
  );
};

export default TripPlanning;