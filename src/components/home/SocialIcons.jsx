import React from 'react';
import Lottie from 'lottie-react';
import { socialIconLocations } from '../data/Data';

const SocialIcons2 = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        zIndex: 1000,
      }}
    >
      {socialIconLocations.map((icon, idx) => (
        <div
          key={icon.type}
          style={{
            marginBottom: '5px',
            backgroundColor: '#ff9900ff',
            padding: '5px',
            borderRadius: '5px',
          }}
        >
          <a id="s1" href={icon.link} target="_blank" rel="noopener noreferrer">
            <Lottie animationData={icon.animation} style={{ width: 40, height: 40 }} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default SocialIcons2;
