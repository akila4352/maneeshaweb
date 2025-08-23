import React, { useState } from 'react';
import Header from '../common/Header';
import { tukTukGalleryImages } from './../data/Data';
import { rtdb } from '../../firebase/firebase';
import { ref, push } from "firebase/database";
import emailjs from 'emailjs-com';
 
const EMAILJS_SERVICE_ID = 'service_0gmvl4o';
const EMAILJS_TEMPLATE_ID = 'template_qodp4ef';
const EMAILJS_USER_ID = 'R_CMaLVBqicquTPm8';
const TravelerIcon = (
  <svg width="20" height="20" style={{marginRight: 8, verticalAlign: 'middle'}} fill="none" stroke="#888" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
  </svg>
);
const CalendarIcon = (
  <svg width="20" height="20" style={{marginRight: 8, verticalAlign: 'middle'}} fill="none" stroke="#888" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="16" rx="2"/>
    <path d="M16 3v4M8 3v4"/>
  </svg>
);


const galleryImages = tukTukGalleryImages.map(item => item.img);

function GalleryModal({ open, images, onClose, currentIndex, setCurrentIndex }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          borderRadius: 12,
          padding: 0,
          maxWidth: 900,
          maxHeight: '80vh',
          overflowY: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 'none',
          background: 'none'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#fff'
        }}>&times;</button>
        <div style={{
          position: 'relative',
          width: '500px',
          height: '350px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={images[currentIndex]}
            alt={`gallery-${currentIndex}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 8,
              boxShadow: '0 4px 24px rgba(0,0,0,0.5)'
            }}
          />
          <button
            onClick={() => setCurrentIndex(i => Math.max(i - 1, 0))}
            disabled={currentIndex === 0}
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              fontSize: 32,
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              color: '#fff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: currentIndex === 0 ? 0.5 : 1,
              transition: 'opacity 0.2s'
            }}
            aria-label="Previous"
          >
            &#8592;
          </button>
          <button
            onClick={() => setCurrentIndex(i => Math.min(i + 1, images.length - 1))}
            disabled={currentIndex === images.length - 1}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              fontSize: 32,
              cursor: currentIndex === images.length - 1 ? 'not-allowed' : 'pointer',
              color: '#fff',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: currentIndex === images.length - 1 ? 0.5 : 1,
              transition: 'opacity 0.2s'
            }}
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
        <div style={{marginTop: 12, color: '#fff', fontSize: '1rem', textShadow: '0 1px 4px #000'}}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

function ImageGrid({ images, onViewGallery }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
      gap: '12px',
      marginBottom: '24px',
      maxWidth: '900px'  
    }}>
      {images.slice(0, 4).map((img, idx) => (
        <div
          key={idx}
          style={{position: 'relative', cursor: 'pointer', borderRadius: 8, overflow: 'hidden'}}
          onClick={() => onViewGallery(idx)}
        >
          <img src={img} alt={`card-${idx}`} style={{
            width: '100%',          
            height: '300px',        
            objectFit: 'cover', 
            display: 'block'
          }} />
          {idx === 3 && (
            <button
              onClick={e => { e.stopPropagation(); onViewGallery(0); }}
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: 6,
                padding: '8px 16px',
                fontWeight: 500,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              View Gallery ({tukTukGalleryImages.length})
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

 
const tukTukDestinations = [
  "Tissamaharama",
  "Ella",
  "Kandy",
  "Galle",
  "Negombo"
];

function BookingCard({ onQuotationClick, form, handleFormChange, errors, isMobile }) {
  return (
    <div
      style={{
        position: isMobile ? 'static' : 'fixed',
        top: isMobile ? undefined : '150px',
        right: isMobile ? undefined : '40px',
        width: isMobile ? '100%' : '500px',
        background: '#fff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        borderRadius: '16px',
        padding: '24px',
        zIndex: 20,
        border: '1px solid #eee',
        height: 'auto',
        margin: isMobile ? '24px 0' : undefined
      }}
    >
      <div style={{fontSize: '2rem', fontWeight: 'bold'}}>
        From <span style={{color: '#222'}}>$24</span> <span style={{fontSize: '1rem', color: '#888'}}>(Per Vehicle)</span>
      </div>
      <div style={{margin: '8px 0', color: '#666'}}>up to 2 guests</div>
      <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '16px 0'}} />
      <div style={{marginBottom: '12px'}}>
        <label>Destination</label>
        <select
          name="destination"
          value={form.destination}
          onChange={handleFormChange}
          className={errors.destination ? 'error' : ''}
          style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", marginTop: 4 }}
        >
          <option value="">Select destination</option>
          {tukTukDestinations.map(dest => (
            <option key={dest} value={dest}>{dest}</option>
          ))}
        </select>
        {errors.destination && <span style={{color: "#e25d5d", fontSize: "0.9rem"}}>{errors.destination}</span>}
      </div>
      <div style={{marginBottom: '12px'}}>
        <label>Trip Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleFormChange}
          className={errors.date ? 'error' : ''}
          style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", marginTop: 4 }}
        />
        {errors.date && <span style={{color: "#e25d5d", fontSize: "0.9rem"}}>{errors.date}</span>}
      </div>
      <div style={{marginBottom: '12px'}}>
        <label>Number of Guests</label>
        <input
          type="number"
          name="travelers"
          placeholder="Number of Guests"
          min="1"
          value={form.travelers}
          onChange={handleFormChange}
          className={errors.travelers ? 'error' : ''}
          style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", marginTop: 4 }}
        />
        {errors.travelers && <span style={{color: "#e25d5d", fontSize: "0.9rem"}}>{errors.travelers}</span>}
      </div>
      <button
        className="submit-btn"
        style={{
          marginBottom: "24px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          background: "#ff9800",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.9rem 2rem",
          fontSize: "1.1rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background 0.2s"
        }}
        onClick={onQuotationClick}
      >
        Quotation
      </button>
      
    </div>
  );
}

// Popup form for quotation
function QuotationPopup({ open, onClose, onSubmit, loading, submitted, errors, form, handleFormChange }) {
  if (!open) return null;
  return (
    <>
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
        onClick={onClose}
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
          <h2 style={{marginBottom: 16}}>Tuk Tuk Quotation</h2>
          <form onSubmit={onSubmit} noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleFormChange}
                  className={errors.name ? 'error' : ''}
                  style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px" }}
                />
                {errors.name && <span style={{color: "#e25d5d", fontSize: "0.9rem"}}>{errors.name}</span>}
              </div>
              <div>
                <label>Contact Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter contact number"
                  value={form.phone}
                  onChange={handleFormChange}
                  className={errors.phone ? 'error' : ''}
                  style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px" }}
                />
                {errors.phone && <span style={{color: "#e25d5d", fontSize: "0.9rem"}}>{errors.phone}</span>}
              </div>
              <div>
                <label>Gmail Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Gmail address"
                  value={form.email}
                  onChange={handleFormChange}
                  className={errors.email ? 'error' : ''}
                  style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px" }}
                />
                {errors.email && <span style={{color: "#e25d5d", fontSize: "0.9rem"}}>{errors.email}</span>}
              </div>
              <div>
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={form.message}
                  onChange={handleFormChange}
                  style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px" }}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "18px" }}>
              <button
                type="button"
                id="tuk-tuk-close-btn"
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
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="submit"
                id="tuk-tuk-submit-btn"
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
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
            {submitted && <div style={{marginTop: "1.2rem", color: "#b3d3db", fontWeight: 500}}>Thank you! We will contact you soon.</div>}
          </form>
        </div>
      </div>
      <style>{`
        #tuk-tuk-quotation-btn:hover,
        #tuk-tuk-close-btn:hover {
          background: #0F172B !important;
        }
        #tuk-tuk-submit-btn:hover {
          background: #b3d3db !important;
        }
        .submit-btn:hover {
          background: #e67c00 !important;
        }
      `}</style>
    </>
  );
}

export default function TukTuk() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  // Quotation popup state
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    destination: '',
    date: '',
    travelers: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Form change handler
  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!form.destination) newErrors.destination = 'Destination required';
    if (!form.date) newErrors.date = 'Trip date required';
    if (!form.travelers || isNaN(form.travelers) || form.travelers < 1) newErrors.travelers = 'Enter number of guests';
    if (!form.name.trim()) newErrors.name = 'Name required';
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Valid email required';
    if (!form.phone.match(/^\+?\d{7,}$/)) newErrors.phone = 'Valid phone required';
    return newErrors;
  };

  // Submit handler
  const handleSubmit = async e => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setSubmitted(true);
      setLoading(true);
      const details = {
        ...form,
        date: form.date ? new Date(form.date).toLocaleDateString() : "",
        createdAt: new Date().toISOString(),
        timestamp: Date.now()
      };
      let rtdbSuccess = false;
      try {
        await push(ref(rtdb, "tukTukQuotations"), details);
        rtdbSuccess = true;

        // Send email via EmailJS
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            type: 'tuk_tuk_booking',
            name: form.name,
            contact: form.phone,
            email: "akilanirmalzz4352@gmail.com",
            destination: form.destination,
            date: details.date,
            travelers: form.travelers,
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
        setShowPopup(false);
        setForm({
          destination: '',
          date: '',
          travelers: '',
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setSubmitted(false);
      } else {
        alert("Failed to send quotation. Please try again.");
      }
    }
  };

  return (
    <>
      
      <div style={{position: 'sticky', top: 0, zIndex: 10, background: '#fafaf8'}}>
        <Header />
      </div>
      <div style={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '32px',
        padding: '32px 16px',
        alignItems: 'flex-start',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        <div style={{flex: 1}}>
          <h1>Tuk Tuk Adventure: Explore Sri Lanka's Villages</h1>
          <div style={{marginBottom: '24px'}}>
            <span style={{fontSize: '1.5rem', color: '#0a8'}}>★★★★★</span>
            <span style={{marginLeft: '8px'}}>5.0 · 2 Ratings · Tissamaharama</span>
          </div>
     
          <ImageGrid images={galleryImages} onViewGallery={idx => { setGalleryOpen(true); setGalleryIndex(idx); }} />
          <p>
            Discover Sri Lanka's charm by renting local tuk tuks. Support village communities and explore with friends. Book your adventure today.
          </p>
          <h2>Things to do</h2>
          <ul>
            <li>Rent high-quality tuktuks from locals, helping to support their income.</li>
            <li>Enjoy insurance coverage for both the tuktuk and personal protection.</li>
            <li>Drive with confidence using locally and...</li>
          </ul>
          
        </div>
        {!isMobile && (
          <BookingCard
            onQuotationClick={() => { setShowPopup(true); setSubmitted(false); setErrors({}); }}
            form={form}
            handleFormChange={handleFormChange}
            errors={errors}
            isMobile={isMobile}
          />
        )}
      </div>
      {isMobile && (
        <div style={{maxWidth: '900px', margin: '0 auto', padding: '0 16px'}}>
          <BookingCard
            onQuotationClick={() => { setShowPopup(true); setSubmitted(false); setErrors({}); }}
            form={form}
            handleFormChange={handleFormChange}
            errors={errors}
            isMobile={isMobile}
          />
        </div>
      )}
      <GalleryModal
        open={galleryOpen}
        images={galleryImages}
        onClose={() => setGalleryOpen(false)}
        currentIndex={galleryIndex}
        setCurrentIndex={setGalleryIndex}
      />
      <QuotationPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleSubmit}
        loading={loading}
        submitted={submitted}
        errors={errors}
        form={form}
        handleFormChange={handleFormChange}
      />
    </>
  );
}