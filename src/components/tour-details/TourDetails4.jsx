import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import BookingCard from "./BookingCard";
import { tourPackages } from "../data/Data";

export default function TourDetails4() {
  const handleBook = (persons, totalPrice, destination, date) => {
    alert(`Booking for ${persons} person(s) to ${destination} on ${date}. Total: USD ${totalPrice}`);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pkg = tourPackages[3];

  return (
    <> 
      <Header />
      <div style={{
        display: "flex",
        maxWidth: "1400px",
        margin: "0 auto",
        gap: "48px",
        padding: "32px 16px",
        alignItems: "flex-start",
        flexDirection: isMobile ? "column" : "row"
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Sri Lanka Tour 4 Days</h2>
          <div style={{ fontWeight: "bold", color: "#888", marginBottom: "1rem" }}>Budget</div>
          <img
            src={pkg.image}
            alt="Tour"
            style={{
              width: isMobile ? "100%" : "900px",
              height: isMobile ? "auto" : "400px",
              maxWidth: "100%",
              borderRadius: "1rem",
              marginBottom: "2rem",
              objectFit: "cover",
              boxShadow: "0 2px 12px rgba(0,0,0,0.10)"
            }}
          />
          <h3 style={{ color: "#FEA116", marginBottom: "1rem" }}>Tour Description</h3>
          <p>
            Enjoy the cool climate and scenic beauty of Nuwara Eliya and Haputale with hotel and guide.
          </p>
          <h3 style={{ color: "#FEA116", marginBottom: "1rem" }}>Routes</h3>
          <ul>
            <li>Nuwara Eliya</li>
            <li>Haputale</li>
          </ul>
          <h3 style={{ color: "#FEA116", marginBottom: "1rem" }}>Inclusions</h3>
          <ul>
            <li>Transport</li>
            <li>Hotel</li>
            <li>Guide</li>
          </ul>
        </div>
        <div style={
          isMobile
            ? { flex: "0 0 400px", minWidth: "340px" }
            : {
                position: "sticky",
                top: "120px",
                alignSelf: "flex-start",
                flex: "0 0 400px",
                minWidth: "340px",
                marginRight: "-40px"
              }
        }>
          <BookingCard price={pkg.pricing.price} days={pkg.pricing.days} destination={pkg.pricing.destination} onBook={handleBook} />
        </div>
      </div>
    </>
  );
}
