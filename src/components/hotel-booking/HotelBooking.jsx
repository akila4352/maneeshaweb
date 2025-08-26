import React, { useState } from 'react';
import Header from '../common/Header';
import FeaturedProperties from './FeaturedProperties';
import Footer from '../common/Footer';
import PropertyList from './PropertyList';
import Header2 from './Header'; // Assuming Header2 is another component for hotel booking
import './home.css'
import SocialIcons2 from '../home/SocialIcons';
export default function HotelBooking() {
  const [selectedProperties, setSelectedProperties] = useState([]);

  return (
    <div>
      <SocialIcons2/>
      <Header /> 
      <Header2 selectedProperties={selectedProperties} />
      <div className="homeContainer">
   
        <h1 className="homeTitle">select  property type</h1>
        <PropertyList
          selected={selectedProperties}
          setSelected={setSelectedProperties}
        />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>

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