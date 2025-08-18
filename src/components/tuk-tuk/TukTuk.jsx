import React, { useState } from 'react';
import Header from '../common/Header';
import { tukTukGalleryImages } from './../data/Data';


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

function GalleryModal({ open, images, onClose }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: 24, maxWidth: 900, maxHeight: '80vh', overflowY: 'auto', position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer'
        }}>&times;</button>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 16}}>
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={`gallery-${idx}`} style={{
              width: '260px', height: '180px', objectFit: 'cover', borderRadius: 8
            }} />
          ))}
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
        <div key={idx} style={{position: 'relative', cursor: 'pointer', borderRadius: 8, overflow: 'hidden'}}>
          <img src={img} alt={`card-${idx}`} style={{
            width: '100%',          
            height: '300px',        
            objectFit: 'cover',
            display: 'block'
          }} />
          {idx === 3 && (
            <button
              onClick={onViewGallery}
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


function BookingCard() {
  return (
    <div style={{
      position: 'fixed', // Change from sticky to fixed
      top: '100px',      // Adjust top offset below header
      right: '40px',     // Stick to right side of viewport
      width: '500px',
      background: '#fff',
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      borderRadius: '16px',
      padding: '24px',
      zIndex: 20,
      border: '1px solid #eee',
      height: 'auto'
     
    }}>
      <div style={{fontSize: '2rem', fontWeight: 'bold'}}>
        From <span style={{color: '#222'}}>$24</span> <span style={{fontSize: '1rem', color: '#888'}}>(Per Vehicle)</span>
      </div>
      <div style={{margin: '8px 0', color: '#666'}}>up to 2 guests</div>
      <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '16px 0'}} />
      <div style={{position: 'relative', marginBottom: '12px'}}>
        <span style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}>{TravelerIcon}</span>
        <select style={{
          width: '100%',
          padding: '10px 10px 10px 40px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          fontSize: '1rem',
          background: '#fafafa',
          appearance: 'none'
        }}>
          <option>1 - Traveler</option>
          <option>2 - Travelers</option>
        </select>
      </div>
      <div style={{position: 'relative', marginBottom: '12px'}}>
        <span style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}>{CalendarIcon}</span>
        <input
          type="date"
          style={{
            width: '100%',
            padding: '10px 10px 10px 40px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            background: '#fafafa'
          }}
          placeholder="Select a date"
        />
      </div>
      <button style={{
        width: '100%',
        background: '#b3d3db',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        border: 'none',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '16px',
        cursor: 'pointer',
        opacity: 0.8
      }}>
        Reserve Your Spot
      </button>
      <div style={{
        background: '#f6fcfd',
        borderRadius: '8px',
        padding: '12px',
        fontSize: '1rem',
        color: '#444',
        border: '1px solid #dbeff2',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px'
      }}>
        <svg width="20" height="20" fill="none" stroke="#4bb" strokeWidth="2" viewBox="0 0 24 24" style={{marginTop: 2}}>
          <circle cx="12" cy="12" r="10" stroke="#b3d3db" strokeWidth="2"/>
          <path d="M8 12l2 2 4-4" stroke="#4bb" strokeWidth="2" fill="none"/>
        </svg>
        <span>
          <span style={{fontWeight: 'bold'}}>Cancellation:</span> Free cancellation up to 24 hours before the start of your experience (local time).
        </span>
      </div>
    </div>
  );
}

export default function TukTuk() {
  const [galleryOpen, setGalleryOpen] = useState(false);

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
        alignItems: 'flex-start'
      }}>
     
        <div style={{flex: 1}}>
          <h1>Tuk Tuk Adventure: Explore Sri Lanka's Villages</h1>
          <div style={{marginBottom: '24px'}}>
            <span style={{fontSize: '1.5rem', color: '#0a8'}}>★★★★★</span>
            <span style={{marginLeft: '8px'}}>5.0 · 2 Ratings · Tissamaharama</span>
          </div>
     
          <ImageGrid images={galleryImages} onViewGallery={() => setGalleryOpen(true)} />
          <p>
            Discover Sri Lanka's charm by renting local tuk tuks. Support village communities and explore with friends. Book your adventure today.
          </p>
          <h2>Highlights</h2>
          <ul>
            <li>Rent high-quality tuktuks from locals, helping to support their income.</li>
            <li>Enjoy insurance coverage for both the tuktuk and personal protection.</li>
            <li>Drive with confidence using locally and...</li>
          </ul>
          
        </div>
      </div>
      <BookingCard />
      <GalleryModal open={galleryOpen} images={galleryImages} onClose={() => setGalleryOpen(false)} />
    </>
  );
}