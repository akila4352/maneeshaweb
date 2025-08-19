import React, { useState } from 'react';
import Header from '../common/Header';
import CommonHeading from '../common/CommonHeading';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './airport.css';
import { vehicles, planeIcons } from '../data/Data';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from '../common/Footer';
import { rtdb } from '../../firebase/firebase';
import { ref, push } from "firebase/database";

// Custom icons
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Airport() {
  const [selected, setSelected] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [time, setTime] = useState("");
  const [pickup, setPickup] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destination, setDestination] = useState("");
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [selectedVehicles, setSelectedVehicles] = useState([0]);
  const [loading, setLoading] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 1 } },
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
    ],
  };

  // Only show airport suggestions for pickup
  const handlePickupChange = e => {
    const val = e.target.value.toLowerCase();
    setPickup(e.target.value);

    if (val.includes("katunayake") || val.includes("bandaranaike")) {
      setPickupSuggestions([planeIcons[0]]);
    } else {
      setPickupSuggestions(
        planeIcons.filter(airport =>
          airport.name.toLowerCase().includes(val)
        )
      );
    }
  };

  const handlePickupSelect = loc => {
    setPickup(loc.name);
    setPickupCoords(loc.coords);
    setPickupSuggestions([]);
  };

  // Fetch location suggestions from LocationIQ
  const fetchLocationSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://us1.locationiq.com/v1/search?key=pk.518c1e38e67d1be60adbbfde1ab34d76&q=${encodeURIComponent(query)}&countrycodes=lk&limit=5&format=json`
      );
      const data = await res.json();
      setSuggestions(
        Array.isArray(data)
          ? data.map(item => ({
              name: item.display_name,
              coords: [parseFloat(item.lat), parseFloat(item.lon)]
            }))
          : []
      );
    } catch (err) {
      setSuggestions([]);
      console.error("Error fetching location suggestions:", err);
    }
  };

  const handleDestinationChange = e => {
    const val = e.target.value;
    setDestination(val);
    fetchLocationSuggestions(val, setDestinationSuggestions);
  };

  const handleDestinationSelect = loc => {
    setDestination(loc.name);
    setDestinationCoords(loc.coords);
    setDestinationSuggestions([]);
  };

  // Handler for selecting destination by clicking on map
  function DestinationSelector() {
    useMapEvents({
      click(e) {
        setDestinationCoords([e.latlng.lat, e.latlng.lng]);
        setDestination(`Lat: ${e.latlng.lat.toFixed(5)}, Lng: ${e.latlng.lng.toFixed(5)}`);
        setDestinationSuggestions([]);
      }
    });
    return null;
  }

  // Helper to extract numeric price per km from vehicle string
  const getPricePerKm = priceStr => {
    const match = priceStr.match(/Per Km (\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  };

  // Distance calculation
  const getDistanceKm = () => {
    if (pickupCoords && destinationCoords) {
      const toRad = x => x * Math.PI / 180;
      const [lat1, lon1] = pickupCoords;
      const [lat2, lon2] = destinationCoords;
      const R = 6371; // km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return Math.max(1, Math.round(R * c)); // at least 1km
    }
    return 10; // fallback
  };

  // Generate quotation details
  const generateQuotationDetails = () => {
    const selectedVehicleObjs = selectedVehicles.map(idx => vehicles[idx]);
    const prices = selectedVehicleObjs.map(vehicle => {
      const pricePerKm = getPricePerKm(vehicle.price);
      const distance = getDistanceKm();
      return {
        name: vehicle.name,
        pricePerKm,
        distance,
        totalPrice: pricePerKm * distance,
        people: vehicle.people,
        bags: vehicle.bags
      };
    });
    const totalPrice = prices.reduce((sum, v) => sum + v.totalPrice, 0);
    
    return {
      type: 'airport_transfer',
      pickup,
      pickupCoords,
      destination,
      destinationCoords,
      date: date.toLocaleDateString(),
      time,
      vehicles: prices,
      totalPrice,
      adult,
      children,
      name,
      contact,
      email,
      distance: getDistanceKm(),
      createdAt: new Date().toISOString(),
      timestamp: Date.now()
    };
  };

  // Update submit handler to generate quotation
  const handleSubmit = async () => {
    // Validate required fields
    if (!pickup || !destination || !time) {
      alert("Please fill in all required fields (pickup, destination, and time).");
      return;
    }

    if (selectedVehicles.length === 0) {
      alert("Please select at least one vehicle.");
      return;
    }

    const details = generateQuotationDetails();
    setBookingDetails(details);
    setShowPopup(true);
  };

  // Handle final form submission to Firebase
  const handleFinalSubmit = async () => {
    // Validate contact information
    if (!bookingDetails.name || !bookingDetails.contact || !bookingDetails.email) {
      alert("Please fill in all contact information.");
      return;
    }

    setLoading(true);
    
    try {
      // Send to Firebase Realtime Database
      const quotationRef = ref(rtdb, "airportQuotations");
      await push(quotationRef, bookingDetails);
      
      alert("Quotation submitted successfully! Our team will contact you within 1 hour.");
      setShowPopup(false);
      
      // Reset form
      setPickup("");
      setPickupCoords(null);
      setDestination("");
      setDestinationCoords(null);
      setTime("");
      setSelectedVehicles([0]);
      setName("");
      setContact("");
      setEmail("");
      setAdult(1);
      setChildren(0);
      setDate(new Date());
      
    } catch (error) {
      console.error("Error submitting quotation:", error);
      alert("Failed to submit quotation. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle info change inside popup
  const handleInfoChange = (field, value) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
    // Also update main state for consistency
    if (field === "name") setName(value);
    if (field === "contact") setContact(value);
    if (field === "email") setEmail(value);
  };

  return (
    <>
      <div className="body1">
        <Header />
        <div className="airport-container">
          <div className='common-heading' style={{ marginTop: "24px" }}>
            <CommonHeading   
              heading="Airport drop and pickup "
              title="Ride"
              subtitle="Book Your "
            />
          </div>
          
          <div className="airport-booking-row">
            <div className="airport-form-col">
              {/* Pickup Location: only airports */}
              <div className="airport-form-group" style={{ position: "relative" }}>
                <label>Pickup Location (Sri Lanka Airports Only) *</label>
                <input
                  type="text"
                  placeholder="Enter Airport"
                  value={pickup}
                  onChange={handlePickupChange}
                  autoComplete="off"
                  required
                />
                {pickupSuggestions.length > 0 && (
                  <ul className="airport-suggest-list">
                    {pickupSuggestions.map((loc, idx) => (
                      <li key={idx} onClick={() => handlePickupSelect(loc)}>
                        {loc.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Destination Location with auto-suggest */}
              <div className="airport-form-group" style={{ position: "relative" }}>
                <label>Destination Location *</label>
                <input
                  type="text"
                  placeholder="Enter Destination Location"
                  value={destination}
                  onChange={handleDestinationChange}
                  autoComplete="off"
                  required
                />
                {destinationSuggestions.length > 0 && (
                  <ul className="airport-suggest-list">
                    {destinationSuggestions.map((loc, idx) => (
                      <li key={idx} onClick={() => handleDestinationSelect(loc)}>
                        {loc.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="airport-form-group">
                <label>Date *</label>
                <input
                  type="text"
                  value={date.toLocaleDateString()}
                  readOnly
                  onClick={() => setShowCalendar(true)}
                  style={{ cursor: "pointer", background: "#fff" }}
                  required
                />
                {showCalendar && (
                  <div style={{ position: "relative", zIndex: 10 }}>
                    <Calendar
                      onChange={d => {
                        setDate(d);
                        setShowCalendar(false);
                      }}
                      value={date}
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>

              <div className="airport-form-group">
                <label>Time *</label>
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  style={{
                    cursor: "pointer",
                    background: "#fff",
                    width: "100%",
                    padding: "10px"
                  }}
                  required
                  onClick={e => {
                    if (e.target.showPicker) e.target.showPicker();
                  }}
                />
              </div>

              <div className="airport-form-group">
                <label>Adults</label>
                <input
                  type="number"
                  min="1"
                  value={adult}
                  onChange={e => setAdult(Number(e.target.value))}
                />
              </div>
              
              <div className="airport-form-group">
                <label>Children</label>
                <input
                  type="number"
                  min="0"
                  value={children}
                  onChange={e => setChildren(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="airport-map-col airport-map-responsive">
              <MapContainer
                center={[7.8731, 80.7718]}
                zoom={7}
                style={{ height: '350px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <DestinationSelector />
                {planeIcons.map((airport, idx) => (
                  <Marker
                    key={idx}
                    position={airport.coords}
                    icon={L.icon({
                      iconUrl: airport.image,
                      iconRetinaUrl: airport.image,
                      iconSize: [32, 32],
                      iconAnchor: [16, 32],
                      popupAnchor: [0, -32],
                      shadowUrl: null,
                      shadowSize: null,
                      shadowAnchor: null
                    })}
                    eventHandlers={{
                      click: () => {
                        setPickup(airport.name);
                        setPickupCoords(airport.coords);
                        setPickupSuggestions([]);
                      }
                    }}
                  >
                    <Popup>{airport.name}</Popup>
                  </Marker>
                ))}
                {pickupCoords && (
                  <Marker position={pickupCoords} icon={greenIcon} />
                )}
                {destinationCoords && (
                  <Marker position={destinationCoords} icon={blueIcon} />
                )}
              </MapContainer>
            </div>
          </div>

          <div className="airport-slider-section" style={{ marginBottom: "32px" }}>
            <Slider {...sliderSettings}>
              {vehicles.map((vehicle, idx) => {
                const isSelected = selectedVehicles.includes(idx);
                return (
                  <div
                    key={idx}
                    className="airport-car-card"
                    style={{
                      border: isSelected ? "2px solid orange" : "1px solid #eee",
                      background: isSelected ? "#fff7e6" : "#fff",
                      position: "relative"
                    }}
                  >
                    <h3>{vehicle.name}</h3>
                    <div style={{ fontSize: '2.5rem', margin: '10px 0' }}>{vehicle.icon}</div>
                    <div style={{ color: '#43b39c', fontWeight: 'bold', marginBottom: '10px' }}>{vehicle.price}</div>
                    <div>
                      <span role="img" aria-label="people">👥</span> {vehicle.people} &nbsp;
                      <span role="img" aria-label="bags">🧳</span> {vehicle.bags}
                    </div>
                    <button
                      style={{
                        marginTop: "18px",
                        background: isSelected ? "#ff9800" : "#0F172B",
                        color: "#fff",
                        border: "none",
                        borderRadius: "20px", 
                        padding: "8px 28px",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        setSelectedVehicles(prev =>
                          prev.includes(idx)
                            ? prev.filter(i => i !== idx)
                            : [...prev, idx]
                        );
                      }}
                    >
                      {isSelected ? "Selected" : "Select"}
                    </button>
                    {isSelected && (
                      <span
                        style={{
                          position: "absolute",
                          top: "16px",
                          right: "16px",
                          color: "#ff9800",
                          fontSize: "1.5rem",
                          fontWeight: "bold"
                        }}
                      >
                        &#10003;
                      </span>
                    )}
                  </div>
                );
              })}
            </Slider>
          </div>

          <button
            className="airport-submit-btn"
            type="button"
            style={{ marginBottom: "24px" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Get Quotation"}
          </button>

          {/* Quotation Popup */}
          {showPopup && bookingDetails && (
            <div
              className="airport-popup"
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
                className="airport-popup-inner"
                onClick={e => e.stopPropagation()}
              >
                <CommonHeading heading="Airport Transfer Quotation" />
                
                <div style={{ marginBottom: "8px" }}>
                  <strong>Pickup:</strong> {bookingDetails.pickup}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Destination:</strong> {bookingDetails.destination}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Date:</strong> {bookingDetails.date}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Time:</strong> {bookingDetails.time}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Distance:</strong> {bookingDetails.distance} km (approx.)
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Vehicles:</strong>
                  <ul style={{ paddingLeft: "18px", margin: "4px 0" }}>
                    {bookingDetails.vehicles.map((v, i) => (
                      <li key={i} style={{ color: "#ff9800", fontWeight: "bold" }}>
                        {v.name} ({v.people} people, {v.bags} bags) - LKR {v.totalPrice.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Passengers:</strong> {bookingDetails.adult} Adult(s), {bookingDetails.children} Children
                </div>
                <div style={{ margin: "14px 0 8px 0", fontSize: "1.2rem", color: "#0F172B", fontWeight: "bold" }}>
                  Total Price: LKR {bookingDetails.totalPrice.toLocaleString()}
                </div>

                <div className="airport-contact-details" style={{ marginBottom: "8px" }}>
                  <CommonHeading heading="Your Information" />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="airport-form-group" style={{ width: "100%", margin: "6px 0" }}>
                      <label style={{ textAlign: "center", display: "block" }}>Your Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", textAlign: "center" }}
                        value={bookingDetails.name}
                        onChange={e => handleInfoChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="airport-form-group" style={{ width: "100%", margin: "6px 0" }}>
                      <label style={{ textAlign: "center", display: "block" }}>Contact Number *</label>
                      <input
                        type="tel"
                        placeholder="Enter contact number"
                        style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", textAlign: "center" }}
                        value={bookingDetails.contact}
                        onChange={e => handleInfoChange("contact", e.target.value)}
                        required
                      />
                    </div>
                    <div className="airport-form-group" style={{ width: "100%", margin: "6px 0" }}>
                      <label style={{ textAlign: "center", display: "block" }}>Email Address *</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        style={{ width: "100%", fontSize: "0.95rem", padding: "6px 10px", textAlign: "center" }}
                        value={bookingDetails.email}
                        onChange={e => handleInfoChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
 
                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <button
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
                    onClick={handleFinalSubmit}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Quotation"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  ); 
}