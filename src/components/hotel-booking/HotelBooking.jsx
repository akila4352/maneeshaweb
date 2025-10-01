import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import Header from '../common/Header';
import FeaturedProperties from './FeaturedProperties';
import Footer from '../common/Footer';
import PropertyList from './PropertyList';
import Header2 from './Header'; // Assuming Header2 is another component for hotel booking
import './home.css'
import SocialIcons2 from '../home/SocialIcons';
export default function HotelBooking() {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [triggerBookNow, setTriggerBookNow] = useState(0);
 
  // Add property to selectedProperties if not already present and trigger booking popup
  const handleBookNow = (propertyName) => {
    setSelectedProperties(prev =>
      prev.includes(propertyName) ? prev : [...prev, propertyName]
    );
    // Open booking popup in Header2 if not already open
    setTriggerBookNow(Date.now());
  };

  return (
    <div>
      <Helmet>
        <title>Hotel Booking Sri Lanka | Travel with Maniya</title>
        <meta name="description" content="Book hotels, resorts, villas, apartments, and cabins across Sri Lanka with Travel with Maniya. Competitive rates, easy booking, no upfront payment required." />
        <meta name="keywords" content="Sri Lanka hotel booking, Sri Lanka resorts, Sri Lanka villas, Sri Lanka apartments, Sri Lanka cabins, Sri Lanka travel agency, book hotels Sri Lanka" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Hotel Booking",
            "provider": {
              "@type": "TravelAgency",
              "name": "Travel with Maniya"
            },
            "areaServed": "Sri Lanka"
          }
        `}</script>
      </Helmet>
      {/* H1 for hotel booking */}
      <h1 style={{display:"none"}}>Sri Lanka Hotel Booking - Hotels, Resorts, Villas, Apartments</h1>
      <SocialIcons2/>
      <Header /> 
      {/* H2 for hotel booking */}
      <h2 style={{display:"none"}}>Book Hotels, Resorts, Villas, Apartments in Sri Lanka</h2>
      <Header2 selectedProperties={selectedProperties} triggerBookNow={triggerBookNow} />
      <div className="homeContainer">
   
        <h1 className="homeTitle">select  property type</h1>
        <PropertyList
          selected={selectedProperties}
          setSelected={setSelectedProperties}
        />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties onBookNow={handleBookNow}/>

      </div> 
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .homeContainer {
            padding: 0 2vw !important;
          }
          .homeTitle {
            font-size: 1rem !important;
            margin: 12px 0 6px 0 !important;
            text-align: center !important;
          }
        }
        @media (max-width: 600px) {
          .homeTitle {
            font-size: 0.95rem !important;
          }
        }
        /* Responsive search bar fields stacking */
        @media (max-width: 900px) {
          .hotel-search-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .hotel-search-bar > * {
            width: 100% !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}