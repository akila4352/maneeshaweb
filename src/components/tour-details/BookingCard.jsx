import React, { useState } from "react";

export default function BookingCard({ price, days, destination, onBook }) {
  const [persons, setPersons] = useState("");
  const [date, setDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Name required";
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.email = "Valid email required";
    if (!form.phone.match(/^\+?\d{7,}$/)) errors.phone = "Valid phone required";
    if (!date) errors.date = "Trip date required";
    if (!persons || isNaN(persons) || persons < 1) errors.persons = "Number of guests required";
    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    setError(errors);
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      setShowPopup(false);
      onBook(persons, ((price || 0) * persons).toFixed(2), destination, date, form);
    }
  };

  return (
    <>
      <form
        onSubmit={e => { e.preventDefault(); setShowPopup(true); }}
        style={{
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          padding: "2rem",
          maxWidth: "400px",
          margin: "32px auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>Pricing</h3>
        <div>Price: USD {price}</div>
        <div>No. of Days: {days}</div>
        <div>Destination: <span style={{ fontWeight: "bold" }}>{destination}</span></div>
        <div style={{width: "100%", marginBottom: "16px", marginTop: "16px"}}>
          <label style={{fontWeight: 500}}>Trip Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{
              width: "100%",
              fontSize: "1rem",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginTop: "4px"
            }}
          />
          {error.date && <div style={{color: "#e25d5d", fontSize: "0.9rem"}}>{error.date}</div>}
        </div>
        <div style={{width: "100%", marginBottom: "16px"}}>
          <label style={{fontWeight: 500}}>Select No. of Persons:</label>
          <select
            value={persons}
            onChange={e => setPersons(e.target.value)}
            style={{
              width: "100%",
              fontSize: "1rem",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginTop: "4px"
            }}
          >
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
          </select>
          {error.persons && <div style={{color: "#e25d5d", fontSize: "0.9rem"}}>{error.persons}</div>}
        </div>
        <div style={{ marginTop: "1rem" }}>
          Total Price: USD {(persons ? (price * persons).toFixed(2) : "0.00")}
        </div>
        <button
          type="submit"
          style={{
            background: "#FEA116",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 32px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            marginTop: "8px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Quotation
        </button>
        <style>{`
          @media (max-width: 600px) {
            form {
              max-width: 100% !important;
              margin: 16px 0 !important;
              padding: 1rem !important;
            }
            input, select, button {
              font-size: 1.1rem !important;
              padding: 14px !important;
            }
          }
        `}</style>
      </form>
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
              maxWidth: "500px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column"
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{marginBottom: 16}}>Trip Quotation</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={error.name ? 'error' : ''}
                    style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px" }}
                  />
                  {error.name && <span style={{color: "#e25d5d", fontSize: "0.9rem"}}>{error.name}</span>}
                </div>
                <div>
                  <label>Contact Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter contact number"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className={error.phone ? 'error' : ''}
                    style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px" }}
                  />
                  {error.phone && <span style={{color: "#e25d5d", fontSize: "0.9rem"}}>{error.phone}</span>}
                </div>
                <div>
                  <label>Gmail Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Gmail address"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={error.email ? 'error' : ''}
                    style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px" }}
                  />
                  {error.email && <span style={{color: "#e25d5d", fontSize: "0.9rem"}}>{error.email}</span>}
                </div>
                <div>
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px" }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
                <button
                  type="button"
                  style={{
                    background: "#b3d3db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    flex: 1,
                    transition: "background 0.2s"
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
                    flex: 1,
                    transition: "background 0.2s"
                  }}
                >
                  Submit
                </button>
              </div>
              {submitted && <div style={{marginTop: "1.2rem", color: "#b3d3db", fontWeight: 500}}>Thank you! We will contact you soon.</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}