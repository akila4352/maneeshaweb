import React from 'react';

const TripPlanner = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* ...existing code... */}
      <div style={{
        width: 350,
        height: 350,
        background: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20
      }}>
        {/* Place your SVG image here */}
        <svg width="300" height="300">
          {/* Example SVG content */}
          <circle cx="150" cy="150" r="100" fill="#fff" />
          {/* ...add your SVG image here... */}
        </svg>
      </div>
      {/* ...existing code... */}
    </div>
  );
}

export default TripPlanner;