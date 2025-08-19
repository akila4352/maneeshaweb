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
      </Routes>
      </BrowserRouter>
     
    </div>
    </div>
    
  );
}

export default App;
