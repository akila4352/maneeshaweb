import React from 'react';
import Header from '../common/Header';
import FeaturedProperties from './FeaturedProperties';

import PropertyList from './PropertyList';
import Header2 from './Header'; // Assuming Header2 is another component for hotel booking
import './home.css'
export default function HotelBooking() {
  return (
     <div>
      <Header />
      <Header2/>
      <div className="homeContainer">
   
        <h1 className="homeTitle">select  property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>
        
      </div>
    </div>
  );
}