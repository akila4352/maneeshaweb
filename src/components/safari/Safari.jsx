import React, { useState } from 'react';
import Header from '../common/Header';
import CommonHeading from '../common/CommonHeading';
import { rtdb } from '../../firebase/firebase';
import { ref, push } from "firebase/database";
import { safariDestinations } from '../data/Data';
import emailjs from 'emailjs-com'; 
 
// Use imported safariDestinations
const destinations = safariDestinations;

const EMAILJS_SERVICE_ID = 'service_0gmvl4o';
const EMAILJS_TEMPLATE_ID = 'template_qodp4ef';
const EMAILJS_USER_ID = 'R_CMaLVBqicquTPm8';

export default function Safari() {
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

  // Handle checkbox selection
  const handleSelect = (name) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  // Calculate total price
  const totalPrice = selected.reduce((sum, name) => {
    const dest = destinations.find(d => d.name === name);
    return sum + (dest ? dest.price : 0);
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
        selectedDestinations: selected,
        totalPrice,
        ...form,
        createdAt: new Date().toISOString()
      };
      let rtdbSuccess = false;
      try {
        await push(ref(rtdb, "safariQuotations"), details);
        rtdbSuccess = true;

        // Send email via EmailJS
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            type: 'safari_booking',
            name: form.name,
            contact: form.phone,
            email: "akilanirmalzz4352@gmail.com",
            destinations: selected.join(', '),
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
      // ...submit logic (e.g., API call)...
    }
  };

  // Handle Quotation button click
  const handleQuotationClick = () => {
    setShowPopup(true);
    setSubmitted(false);
    setErrors({});
  };

  return (
    <>
      <Header />
      <div className="safari-page">
        <CommonHeading
          heading="Safari"
          title="Destinations"
          subtitle="Explore Top"
        />
        <div className="safari-grid">
          {destinations.map(dest => (
            <div
              className={`safari-card${selected.includes(dest.name) ? ' selected' : ''}`}
              key={dest.name}
              style={{
                background: `url(${dest.image}) center/cover no-repeat`,
                position: "relative"
              }}
            >
              {/* Overlay for gradient effect */}
              <div className="safari-card-image-overlay"></div>
              {/* Dark transparent filter for text area */}
              <div className="card-content-overlay">
                <label className="card-checkbox">
                  <input
                    type="checkbox"
                    checked={selected.includes(dest.name)}
                    onChange={() => handleSelect(dest.name)}
                  />
                  <span className="custom-checkbox"></span>
                </label>
                <div className="card-content">
                  <h2 className="card-title">{dest.name}</h2>
                  <p className="card-desc">{dest.description}</p>
                  <div className="card-price">${dest.price.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="selected-summary">
          <h3>Selected Destinations:</h3>
          <ul>
            {selected.length === 0 ? <li>None selected</li> :
              selected.map(name => <li key={name}>{name}</li>)
            }
          </ul>
          <div className="total-price">
            <strong>Total Price:</strong> ${totalPrice.toLocaleString()}
          </div>
        </div>
        {/* Remove info form from main page */}
        <button
          className="submit-btn"
          style={{ marginBottom: "24px", display: "block", marginLeft: "auto", marginRight: "auto" }}
          onClick={handleQuotationClick}
        >
          Quotation 
        </button>
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
                maxWidth: "600px", // increased width for desktop
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column"
              }}
              className="safari-popup-inner"
              onClick={e => e.stopPropagation()}
            >
              <CommonHeading
                heading="Quotation"
              />
              <div style={{ marginBottom: "8px", color: "#0F172B", fontWeight: "bold", fontSize: "1.2rem" }}>
                <strong>Selected Destinations:</strong>
                <ul style={{ paddingLeft: "18px", margin: "4px 0" }}>
                  {selected.length === 0 ? <li>None selected</li> :
                    selected.map(name => <li key={name} style={{ color: "#ff9800", fontWeight: "bold" }}>{name}</li>)
                  }
                </ul>
              </div>
              <div style={{ marginBottom: "8px", color: "#0F172B", fontWeight: "bold", fontSize: "1.2rem" }}>
                <strong>Total Price:</strong> ${totalPrice.toLocaleString()}
              </div>
              {/* Info form inside popup */}
              <div className="safari-contact-details" style={{ marginBottom: "8px" }}>
                <CommonHeading
                  heading="Your Information"
                />
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="form-row" style={{ width: "100%", margin: "8px 0" }}>
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
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>
                    <div className="form-row" style={{ width: "100%", margin: "8px 0" }}>
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
                      {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>
                    <div className="form-row" style={{ width: "100%", margin: "8px 0" }}>
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
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                    <div className="form-row" style={{ width: "100%", margin: "8px 0" }}>
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
                      {errors.travelers && <span className="form-error">{errors.travelers}</span>}
                    </div>
                    <div className="form-row" style={{ width: "100%", margin: "8px 0" }}>
                      <label style={{ textAlign: "center", display: "block" }}>Travel Date</label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleFormChange}
                        className={errors.date ? 'error' : ''}
                        style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", textAlign: "center" }}
                      />
                      {errors.date && <span className="form-error">{errors.date}</span>}
                    </div>
                    <div className="form-row" style={{ width: "100%", margin: "8px 0" }}>
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
                    >
                      Submit
                    </button>
                  </div>
                  {submitted && <div className="form-success">Thank you! We will contact you soon.</div>}
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .safari-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .safari-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          font-weight: 700;
          color: #2d3a3a;
        }
        .safari-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        @media (max-width: 800px) {
          .safari-grid {
            grid-template-columns: 1fr;
          }
        }
        .safari-card {
          border-radius: 1rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
          overflow: hidden;
          position: relative;
          transition: box-shadow 0.2s, transform 0.2s;
          display: flex;
          flex-direction: column;
          min-height: 480px;
          height: 100%;
          border: none;
          background-size: cover;
          background-position: center;
        }
        .safari-card:hover {
          box-shadow: 0 12px 32px rgba(0,0,0,0.18);
          transform: translateY(-6px) scale(1.03);
        }
        .safari-card.selected {
          box-shadow: 0 12px 32px rgba(255,152,0,0.25), 0 4px 24px rgba(0,0,0,0.12);
        }
        /* Gradient overlay for image (bottom 1/2 only) */
        .safari-card-image-overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 50%;
          pointer-events: none;
          z-index: 1;
          border-radius: 0 0 1rem 1rem;
          /* Gradient: lighter at top, darker at bottom */
          background: linear-gradient(
            to bottom,
            rgba(30,30,30,0.0) 0%,
            rgba(30,30,30,0.45) 40%,
            rgba(30,30,30,0.85) 100%
          );
        }
        .card-content-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          min-height: 180px;
          background: linear-gradient(180deg, rgba(30,30,30,0.0) 0%, rgba(30,30,30,0.78) 100%);
          color: #fff;
          padding: 32px 18px 18px 18px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          z-index: 2;
        }
        .card-checkbox {
          position: absolute;
          top: 18px;
          right: 18px;
          z-index: 2;
        }
        .card-checkbox input[type="checkbox"] {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .custom-checkbox {
          display: inline-block;
          width: 28px;
          height: 28px;
          background: #fff;
          border: 2px solid #ff9800;
          border-radius: 50%;
          position: relative;
          transition: background 0.2s;
          cursor: pointer;
        }
        .card-checkbox input:checked + .custom-checkbox {
          background: #ff9800;
        }
        .custom-checkbox:after {
          content: '';
          position: absolute;
          left: 8px;
          top: 5px;
          width: 8px;
          height: 14px;
          border: solid #fff;
          border-width: 0 3px 3px 0;
          opacity: 0;
          transform: rotate(45deg);
          transition: opacity 0.2s;
        }
        .card-checkbox input:checked + .custom-checkbox:after {
          opacity: 1;
        }
        .card-content {
          padding: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.7rem;
          color: #fff;
        }
        .card-desc {
          flex: 1;
          font-size: 1.08rem;
          color: #f3f3f3;
          margin-bottom: 1.2rem;
        }
        .card-price {
          font-size: 1.1rem;
          font-weight: 500;
          color: #ff9800;
        }
        .selected-summary {
          margin: 2rem 0 2.5rem 0;
          background: #f7faf9;
          border-radius: 0.7rem;
          padding: 1.2rem;
        }
        .selected-summary h3 {
          margin-top: 0;
          font-size: 1.2rem;
          color: #2d3a3a;
        }
        .selected-summary ul {
          margin: 0.5rem 0 1rem 0;
          padding-left: 1.2rem;
        }
        .total-price {
          font-size: 1.1rem;
          color: #ff9800;
        }
        .contact-form {
          background: #fff;
          border-radius: 1rem;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          padding: 2rem 1.5rem;
          max-width: 500px;
          margin: 0 auto 2rem auto;
        }
        .contact-form h2 {
          margin-top: 0;
          font-size: 1.5rem;
          color: #2d3a3a;
          margin-bottom: 1.2rem;
        }
        .form-row {
          margin-bottom: 1.2rem;
          position: relative;
        }
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 0.8rem;
          border-radius: 0.5rem;
          border: 1px solid #d0e2e2;
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        .contact-form input.error,
        .contact-form textarea.error {
          border-color: #ff9800;
        }
        .form-error {
          color: #e25d5d;
          font-size: 0.9rem;
          position: absolute;
          top: 100%;
          left: 0;
        }
        .submit-btn {
          background: #ff9800;
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          padding: 0.9rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .submit-btn:hover {
          background: #e67c00;
        }
        .form-success {
          margin-top: 1.2rem;
          color: #ff9800;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}