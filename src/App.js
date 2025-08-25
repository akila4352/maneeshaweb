import './App.css';
import "./components/css/style.css";
import "./components/css/bootstrap.min.css";
import "./components/css/animate.css";
import "./components/css/animate.min.css";
import Footer from './components/common/Footer';
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Carousel from './components/home/Carousel';
import Intro from './components/home/Intro';
import Services from './components/home/Service';
import Slider from './components/home/Slider';
import Destination from './components/home/Destination';
import Airport from './components/airport/Airport';
 import Safari from './components/safari/Safari';
 import TripPlanning from '../src/components/trip-planning/Trip Planning';
import TukTuk from '../src/components/tuk-tuk/TukTuk';
import HotelBooking from '../src/components/hotel-booking/HotelBooking';
import Admin from './components/admin/admin';
import SocialIcons from './components/common/SocialIcons';
import SocialIcons2 from './components/home/SocialIcons';
import TourDetails1 from './components/tour-details/TourDetails1';
import TourDetails2 from './components/tour-details/TourDetails2';
import TourDetails3 from './components/tour-details/TourDetails3';
import TourDetails4 from './components/tour-details/TourDetails4';
import TourDetails5 from './components/tour-details/TourDetails5';
import TourDetails6 from './components/tour-details/TourDetails6';

function App() {
return (
    <div className="App">
      <div >
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/footer" element={<Footer/>}/>
      <Route path="/carousel" element={<Carousel/>}/>
      <Route path="/intro" element={<Intro/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/slider" element={<Slider/>}/>
      <Route path="/destination" element={<Destination/>}/>
      <Route path="/airport" element={<Airport/>}/>
      <Route path="/safari" element={<Safari/>}/>
    <Route path="/trip-planning" element={<TripPlanning/>}/> 
     <Route path="/tuk-tuk" element={<TukTuk/>}/>
      <Route path="/hotel-booking" element={<HotelBooking/>}/> 
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/socialicons" element={<SocialIcons2/>}/>
      <Route path="/tour-details1" element={<TourDetails1 />} />
      <Route path="/tour-details2" element={<TourDetails2 />} />
      <Route path="/tour-details3" element={<TourDetails3 />} />
      <Route path="/tour-details4" element={<TourDetails4 />} />
      <Route path="/tour-details5" element={<TourDetails5 />} />
      <Route path="/tour-details6" element={<TourDetails6 />} />
      </Routes>
      </BrowserRouter>
     
    </div>
    </div>
    
  );
}

export default App;
