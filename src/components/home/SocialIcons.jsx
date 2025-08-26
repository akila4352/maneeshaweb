import React from 'react';
import { socialIconLocations } from '../data/Data';

// Add keyframes for pulsing animation
const pulseStyle = `
@keyframes pulse {
  0% { transform: scale(1);}
  50% { transform: scale(1.15);}
  100% { transform: scale(1);}
}
`;

const SocialIcons2 = () => {
  return (
    <>
      <style>{pulseStyle}</style>
      <div
        className="social-icons-fixed"
        style={{
          position: 'fixed',
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
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            <a
              id="s1"
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                animation: 'pulse 1s infinite',
              }}
            >
              {icon.img ? (
                <img src={icon.img} alt="WhatsApp" style={{ width: 80, height: 80 }} />
              ) : null}
            </a>
          </div>
        ))}
      </div>
      <style>{`
        ${pulseStyle}
        @media (max-width: 900px) {
          .social-icons-fixed {
            top: 85% !important;
          }
        }
        @media (min-width: 901px) {
          .social-icons-fixed {
            top: 90% !important; // moved further down for Windows/desktop mode
          }
        }
      `}</style>
    </>
  );
};

export default SocialIcons2;
