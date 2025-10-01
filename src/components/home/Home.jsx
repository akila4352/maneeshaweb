import React from 'react';
import { Helmet } from "react-helmet";
import Header from '../common/Header';
import Footer from '../common/Footer';
import Carousel from './Carousel';
import Intro from './Intro';
import Services from './Service';
import Sliders from './Slider';
import Destination from './Destination';
import SocialIcons2 from './SocialIcons';
import { useNavigate } from "react-router-dom";
import { navList } from "../data/Data";

const specialLinkStyle = {
  background: "#FEA116 ",
  color: "#0F172B",
  fontWeight: "bold",
  boxShadow: "0 2px 8px rgba(15,23,43,0.08)",
  padding: "12px 0",
  border: "none",
  borderRadius: "0",
  width: "50%",
  fontSize: "1.1rem",
  textAlign: "center",
  transition: "color 0.2s, background 0.2s",
};
 
const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <title>Travel with Maniya | Sri Lanka Travel Agency - Airport Transfers, Safari, Tuk Tuk, Hotels, Trip Planning</title>
        <meta name="description" content="Travel with Maniya offers airport transfers, trip planning, safari bookings, tuk tuk village adventures, and hotel bookings across Sri Lanka. Reliable, affordable, authentic travel for international tourists." />
        <meta name="keywords" content="Sri Lanka travel agency, airport transfers Sri Lanka, safari Sri Lanka, tuk tuk tours, Sri Lanka hotels, trip planning Sri Lanka, Sri Lanka tourism, wildlife tours, village experiences, flexible booking" />
        <meta property="og:title" content="Travel with Maniya - Sri Lanka Travel Agency" />
        <meta property="og:description" content="Book airport transfers, safaris, tuk tuk adventures, hotels, and plan your Sri Lankan trip with Travel with Maniya." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Travel with Maniya",
            "url": "https://yourdomain.com/",
            "description": "Sri Lanka travel agency specializing in airport transfers, trip planning, safaris, tuk tuk village adventures, and hotel bookings.",
            "areaServed": "Sri Lanka",
            "telephone": "+94-XXXXXXXXX",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "LK"
            },
            "serviceType": [
              "Airport Transfer",
              "Trip Planning",
              "Safari Booking",
              "Tuk Tuk Adventure",
              "Hotel Booking"
            ]
          }
        `}</script>
      </Helmet>
      {/* H1 for homepage */}
      <h1 style={{display:"none"}}>Travel with Maniya - Sri Lanka Travel Agency</h1>
      <SocialIcons2/>
      <Header />
      {/* H2 for main sections */}
      <h2 style={{display:"none"}}>Sri Lanka Airport Transfers, Safari, Tuk Tuk, Hotels, Trip Planning</h2>
      <Carousel />
      <Intro />
      <Services />
      <Destination />
      <Sliders />
      {/* Internal links for SEO */}
      <nav aria-label="Main services" style={{display:"none"}}>
        <a href="/airport">Airport Transfers</a>
        <a href="/trip-planning">Trip Planning</a>
        <a href="/safari">Safari Bookings</a>
        <a href="/tuk-tuk">Tuk Tuk Adventures</a>
        <a href="/hotel-booking">Hotel Booking</a>
      </nav>
      <Footer />
      {/* Mobile bottom navigation buttons */}
      <div className="mobile-bottom-nav">
        <button
          style={specialLinkStyle}
          className="mobile-bottom-btn mobile-bottom-btn-left"
          onClick={() => {
            navigate(navList[1].path);
          }}
        >
          {navList[1].text}
        </button>
        <button
          style={specialLinkStyle}
          className="mobile-bottom-btn mobile-bottom-btn-right"
          onClick={() => {
            navigate(navList[2].path);
          }}
        >
          {navList[2].text}
        </button>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .mobile-bottom-nav {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            display: flex;
            z-index: 9999;
            box-shadow: 0 -2px 12px rgba(0,0,0,0.12);
          }
          .mobile-bottom-btn {
            border: none;
            border-radius: 0 !important;
          }
          .mobile-bottom-btn-left {
            border-top-left-radius: 16px !important;
          }
          .mobile-bottom-btn-right {
            border-top-right-radius: 16px !important;
          }
        }
        @media (min-width: 901px) {
          .mobile-bottom-nav {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}; 

export default Home;



