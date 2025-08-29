import React from 'react';
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
    <div><SocialIcons2/>
      <Header />
      <Carousel />
      <Intro />
      <Services />
      <Destination />
      <Sliders />
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



