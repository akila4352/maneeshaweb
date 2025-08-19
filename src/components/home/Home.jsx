import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Carousel from './Carousel';
import Intro from './Intro';
import Services from './Service';
import Sliders from './Slider';
import Destination from './Destination';
import SocialIcons2 from './SocialIcons';
const Home = () => {
  return (
    <div><SocialIcons2/>
      <Header />
      <Carousel />
      <Intro />
      <Services />
      <Destination />
      <Sliders />
      <Footer />
    </div>
  );
}; 

export default Home;

