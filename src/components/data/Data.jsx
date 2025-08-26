import gmailAnimation from './gmail.json';
import viberAnimation from './viber.json';
import locationAnimation from './location.json';

export const navList = [
  {
    id: 1,
    path: "/", 
    text: "Home",
    subItems: [
      {
        id: 51,
        path: "#services", // Use anchor link for Services
        text: "Services",
      },
      {
        id: 53,
        path: "#destinations", // New anchor link for Destinations
        text: "Destinations",
      },
      {
        id: 52,
        path: "#footer", // Anchor link for Contact Us
        text: "Contact Us",
      },
    
    ],
  },
  {
    id: 2,
    path: "/airport",
    text: "Airport"
  },{
    id: 4,
    path: "/trip-planning",
    text: "Trip Planning",
  },
  {
    id: 3,
    path: "/safari",
    text: "Safari",
  },
  
  {
    id: 5,
    path: "/tuk-tuk",
    text: "Tuk Tuk",
   
  },
  {
    id: 6,
    path: "/hotel-booking",
    text: "Hotel Booking",
  },
];
export const socialIcons = [
  {
    icon: <i className="fab fa-facebook-f"></i>,
    link: "https://facebook.com",
  },
  {
    icon: <i className="fab fa-instagram"></i>,
    link: "https://instagram.com",
  },  

  
];

export const footerItem = [
  {
    id: 1,
    header: "Company",
    UnitItem: [
      {
        name: "About Us",
      },
      {
        name: "Contact Us",
      },
      {
        name: "Privacy Policy",
      },
      {
        name: "Terms & Condition",
      },
      {
        name: "Support",
      },
    ],
  },
];

export const footerContact = [
  {
    icon: <i className="fa fa-map-marker-alt me-3"></i>,
    name: "123 Street, New York, USA",
  },
  {
    icon: <i className="fa fa-phone-alt me-3"></i>,
    name: "+012 345 67890",
  },
  {
    icon: <i className="fa fa-envelope me-3"></i>,
    name: "info@example.com",
  },
];

export const contact = [
  {
    icon: <i class="fa fa-envelope-open text-primary me-2"></i>,
    title: "Booking",
    email: "book@example.com",
  },
  {
    icon: <i class="fa fa-envelope-open text-primary me-2"></i>,
    title: "Technical",
    email: "tech@example.com",
  },
  {
    icon: <i class="fa fa-envelope-open text-primary me-2"></i>,
    title: "General",
    email: "info@example.com",
  },
];


export const services = [  
  {
    icon: <i class="fa fa-shuttle-van fa-2x text-primary"></i>,
    name: "Airport drop and pickup",
    discription: "Contrary to popular belief, ipsum is not simply random.",
    path: "/airport"
  },
  {
    icon: <i class="fa fa-suitcase-rolling fa-2x text-primary"></i>,
    name: "Plan your dream trip",
    discription: "Contrary to popular belief, ipsum is not simply random.",
    path: "/trip-planning"
  },
  {
    icon: <i class="fa fa-binoculars fa-2x text-primary"></i>,
    name: "Safari",
    discription: "Contrary to popular belief, ipsum is not simply random.",
    path: "/safari"
  },
  {
    icon: <i class="fa fa-bed fa-2x text-primary"></i>,
    name: "Rooms & Apartment",
    discription: "Contrary to popular belief, ipsum is not simply random.",
    path: "/hotel-booking"
  },
  {
    icon: <i class="fa fa-taxi fa-2x text-primary"></i>,
    name: "TukTuk journey",
    discription: "Contrary to popular belief, ipsum is not simply random.",
    path: "/tuk-tuk"
  },
  {
    icon: <i class="fa fa-calendar-check fa-2x text-primary"></i>,
    name: "Easy Bookings",
    discription: "Book your travel, stay, and experiences in just a few clicks.",
    path: "/"
  }
];
export const testimonial = [
  {
    description:
      "My trip was seamless and unforgettable! The team took care of every detail, from airport pickup to hotel booking. Highly recommended for solo travelers.",
    name: "Poppy",
    profession: "Solo Traveler",
    icon: (
      <i class="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
    ),
    img: "../assets/img/testimonial-1.jpg",
  },
  {
    description:
      "Amazing experience! The safari was breathtaking and the guides were knowledgeable. I enjoyed every moment and felt safe throughout my journey.",
    name: "Leo",
   
    icon: (
      <i class="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
    ),
    img: "../assets/img/testimonial-2.jpg",
  },
  {
    description:
      "As a photographer, I found the destinations inspiring and the arrangements perfect for capturing Sri Lanka’s beauty. Will definitely book again!",
    name: "Luka",
    profession: "Photographer",
    icon: (
      <i class="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
    ),
    img: "../assets/img/testimonial-3.jpg",
  },
];

export const carouselData = [
  {
    img: "../assets/img/carousel-1.jpg",
    title: "Discover Hidden Village Treasures",
    subtitle: "Authentic rural adventures",
    btn1: "Village Tours",
    btn2: "Book Sri Lanka Tour",
    navigatePath: "/tuk-tuk"
  },
  {
    img: "../assets/img/airport.jpg",
    title: "Airport Drop & Pickup",
    subtitle: "Convenient transfers",
    btn1: "Book Airport Ride",
    btn2: "View Vehicles",
    navigatePath: "/airport"
  },
  {
    img: "../assets/img/carousel3.jpg",
    title: "Plan Your Dream Trip",
    subtitle: "Custom itineraries for you",
    btn1: "Start Planning",
    btn2: "Get Quotation",
    navigatePath: "/trip-planning"
  },
  {
    img: "../assets/img/carousel4.jpg",
    title: "Safari Adventures",
    subtitle: "Wildlife & nature tours",
    btn1: "Explore Safaris",
    btn2: "Book Safari",
    navigatePath: "/safari"
  },
  {
    img: "../assets/img/carousel-2.jpg",
    title: "Discover Luxurious Hotels",
    subtitle: "Luxury living",
    btn1: "Our Rooms",
    btn2: "Book Room",
    navigatePath: "/hotel-booking"
  },
];

export const vehicles = [
  {
    name: "KDH Flat Roof Van",
    price: "Per Km 170.00 LKR (0.57 USD)",
    icon: "🚐",
    people: 5,
    bags: 5,
  },
  {
    name: "KDH High Roof Van",
    price: "Per Km 230.00 LKR (0.77 USD)",
    icon: "🚐",
    people: 9,
    bags: 9,
  },
  { 
    name: "Bus ",
    price: "Per Km 250.00 LKR (0.84 USD)",
    icon: "🚌",
    people: 15,
    bags: 15,
  },
  {
    name: "Mini Car",
    price: "Per Km 110.00 LKR (0.37 USD)",
    icon: "🚗",
    people: 2,
    bags: 2,
  },
  {
    name: "Sedan Car",
    price: "Per Km 125.00 LKR (0.42 USD)",
    icon: "🚙",
    people: 3,
    bags: 3,
  },
  {
    name: "SUV Car",
    price: "Per Km 135.00 LKR (0.45 USD)",
    icon: "🚚",
    people: 4,
    bags: 4,
  },
];

export const planeIcons = [
  {
    name: "Bandaranaike International Airport (Katunayake)",
    coords: [7.1808, 79.8841],
    image: "../assets/img/plane.png"
  },
  {
    name: "Mattala Rajapaksa International Airport",
    coords: [6.2845, 81.1242],
    image: "../assets/img/plane.png"
  },
  {
    name: "Ratmalana Airport",
    coords: [6.8219, 79.8862],
    image: "../assets/img/plane.png"
  }
]; 

export const safariDestinations = [
  {
    name: 'Yala National Park',
    description: 'Known for its leopards population and diverse wildlife.',
    price: 1000,
    image: "../assets/img/Yala1.jpg"
  },
  {
    name: 'Udawalawa National Park',
    description: 'Famous for elephants sightings ',
    price: 1100,
    image: "../assets/img/udawalawa.jpg"
  },
  {
    name: 'Sinharaja Forest Reserve',
    description: 'A biodiversity hotspot with  rainforests ideal for trekking.',
    price: 1300,
    image: "../assets/img/sinharaja.jpg"
  },
  {
    name: 'Horton plains & World\'s End',
    description: 'A highland plateau with dramatic cliffs and scenic hikes.',
    price: 1000,
    image: "../assets/img/hortonplains.jpg"
  },
  {
    name: 'Knuckles Mountain Range',
    description: 'Ideal for hiking and nature exploration.',
    price: 1400,
    image: "../assets/img/Knuckles.jpg"
  },
  {
    name: 'Wilpattu National Park',
    description: 'Famous for its leopard population and unique dry zone ecosystem.',
    price: 1200,
    image: "../assets/img/wilpattu.jpg"
  }

];
 
export const tripPlanningDestinations = [
  {
    name: 'Cultural Triangle Tour',
    description: 'Explore ancient cities and UNESCO sites in Sri Lanka’s cultural heartland.',
    pricePerDay: 900,
    image: "../assets/img/cultural_triangle.jpg"
  },
  {
    name: 'Hill Country Adventure',
    description: 'Scenic train rides, tea plantations, and cool mountain escapes.',
    pricePerDay: 1100,
    image: "../assets/img/hill_country.jpg"
  },
  {
    name: 'Beach Relaxation',
    description: 'Golden beaches, water sports, and coastal towns.',
    pricePerDay: 800,
    image: "../assets/img/beach.jpg"
  },
  {
    name: 'Wildlife & Nature',
    description: 'National parks, safaris, and eco tours.',
    pricePerDay: 1200,
    image: "../assets/img/wildlife_nature.jpg"
  },
  {
    name: 'City Highlights',
    description: 'Colombo city tour, shopping, and urban experiences.',
    pricePerDay: 700,
    image: "../assets/img/city_highlights.jpg"
  }
];

export const tripPlanningImages = [
  { img: "../assets/img/kandy.jpg", title: "Kandy", subtitle: "Cultural Capital" },
  { img: "../assets/img/evesigiri.jpg", title: "Evesigiri", subtitle: "Ancient Marvel" },

  { img: "../assets/img/beach.jpg", title: "Beach", subtitle: "Relax & Enjoy" },
 
];

export const tukTukGalleryImages = [
  { img: ('../assets/img/about-2.jpg') },
  { img:('../assets/img/tuktuk2.jpg') },
  { img: ('../assets/img/tuktuk3.jpg') },
  { img: ('../assets/img/tuktuk5.jpg') },
  { img:('../assets/img/tuktuk8.jpg') },
  { img: ('../assets/img/tuktuk6.jpg') },
  { img: ('../assets/img/tuktuk7.jpg') },
    { img: ('../assets/img/tuktuk11.jpg') },
     { img: ('../assets/img/tuktuk13.jpg') },
      { img: ('../assets/img/tuktuk14.jpg') },
       { img: ('../assets/img/tuktuk15.jpg') },
        { img: ('../assets/img/tuktuk16.jpg') },
         { img: ('../assets/img/tuktuk20.jpg') }
];

export const featuredPropertiesData = [
  {
    img: "../assets/img/villashade.png",
    name: "Villa Shade",
    city: "Habaraduwa",
    price: "Starting from $50",
    rating: 8.9,
    ratingText: "Excellent"
  },
  {
    img: "../assets/img/villashade.png",
    name: "Blue Ocean Villa",
    city: "Galle",
    price: "Starting from $140",
    rating: 9.3,
    ratingText: "Exceptional"
  },
  {
    img: "../assets/img/villashade.png",
    name: "Serendib Hotel",
    city: "Kandy",
    price: "Starting from $99",
    rating: 8.8,
    ratingText: "Excellent"
  },
  {
    img: "../assets/img/villashade.png",
    name: "Hilton Garden Inn",
    city: "Colombo",
    price: "Starting from $105",
    rating: 8.9,
    ratingText: "Excellent"
  }
];


export const socialIconLocations = [
  {
    type: "call",
    link: "",
      img: ('../assets/img/logo.png') 
  },

];

export const tourPackages = [
  {
    image: "../assets/img/ella.jpg",
    days: 1,
    routes: ["Colombo", "Ella"],
    inclusions: ["Transport"],
    thumb: "../assets/img/ella.jpg",
    price: "70.00",
    pricing: {
      label: "Pricing",
      price: 70.0,
      days: 1,
      destination: "Colombo, Ella",
      persons: [1, 2, 3, 4, 5],
    },
  },
  {
    image: "../assets/img/kandy.jpg",
    days: 2,
    routes: ["Ella", "Kandy"],
    inclusions: ["Transport", "Hotel"],
    thumb: "../assets/img/kandy.jpg",
    price: "120.00",
    pricing: {
      label: "Pricing",
      price: 120.0,
      days: 2,
      destination: "Ella, Kandy",
      persons: [1, 2, 3, 4, 5],
    },
  },
  {
    image: "../assets/img/sigiriya.jpg",
    days: 3,
    routes: ["Kandy", "Sigiriya"],
    inclusions: ["Transport", "Guide"],
    thumb: "../assets/img/sigiriya.jpg",
    price: "180.00",
    pricing: {
      label: "Pricing",
      price: 180.0,
      days: 3,
      destination: "Kandy, Sigiriya",
      persons: [1, 2, 3, 4, 5],
    },
  },
  {
    image: "../assets/img/nuwaraeliya.jpg",
    days: 4,
    routes: ["Sigiriya", "Nuwara Eliya", "Haputale"],
    inclusions: ["Transport", "Hotel", "Guide"],
    thumb: "../assets/img/nuwaraeliya.jpg",
    price: "240.00",
    pricing: {
      label: "Pricing",
      price: 240.0,
      days: 4,
      destination: "Sigiriya, Nuwara Eliya, Haputale",
      persons: [1, 2, 3, 4, 5],
    },
  },
  {
    image: "../assets/img/palliya.jpg",
    days: 5,
    routes: ["Haputale", "Trincomalee", "Jaffna"],
    inclusions: ["Transport", "Hotel"],
    thumb: "../assets/img/palliya.jpg",
    price: "300.00",
    pricing: {
      label: "Pricing",
      price: 300.0,
      days: 5,
      destination: "Haputale, Trincomalee, Jaffna",
      persons: [1, 2, 3, 4, 5],
    },
  },
  {
    image: "../assets/img/polonaruwa.jpg",
    days: 6,
    routes: ["Jaffna", "Anuradhapura", "Polonnaruwa", "Colombo"],
    inclusions: ["Transport", "Hotel", "Guide"],
    thumb: "../assets/img/polonaruwa.jpg",
    price: "360.00",
    pricing: {
      label: "Pricing",
      price: 360.0,
      days: 6,
      destination: "Jaffna, Anuradhapura, Polonnaruwa, Colombo",
      persons: [1, 2, 3, 4, 5],
    },
  },
];

