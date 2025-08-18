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
    text: "Airport",
  },
  {
    id: 3,
    path: "/safari",
    text: "Safari",
  },
  {
    id: 4,
    path: "/trip-planning",
    text: "Trip Planning",
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
    icon: <i className="fab fa-twitter"></i>,
    link: "https://twitter.com",
  },
  {
    icon: <i className="fab fa-instagram"></i>,
    link: "https://instagram.com",
  },
  {
    icon: <i className="fab fa-linkedin-in"></i>,
    link: "https://linkedin.com",
  },
  {
    icon: <i className="fab fa-youtube"></i>,
    link: "https://youtube.com",
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
    icon: <i class="fa fa-bed fa-2x text-primary"></i>, // Rooms & Apartment
    name: "Rooms & Apartment",
    discription: "Contrary to popular belief, ipsum is not simply random.",
  },
  {
    icon: <i class="fa fa-suitcase-rolling fa-2x text-primary"></i>, // Travel packages
    name: "Travel packages",
    discription: "Contrary to popular belief, ipsum is not simply random.",
  },
  {
    icon: <i class="fa fa-binoculars fa-2x text-primary"></i>, // Safari
    name: "Safari",
    discription: "Contrary to popular belief, ipsum is not simply random.",
  },
  {
    icon: <i class="fa fa-shuttle-van fa-2x text-primary"></i>, // Airport drop and pickup
    name: "Airport drop and pickup",
    discription: "Contrary to popular belief, ipsum is not simply random.",
  },
  {
    icon: <i class="fa fa-glass-cheers fa-2x text-primary"></i>, // Event & Party
    name: "Event & Party",
    discription: "Contrary to popular belief, ipsum is not simply random.",
  },
  {
    icon: <i class="fa fa-taxi fa-2x text-primary"></i>, // TukTuk journey
    name: "TukTuk journey",
    discription: "Contrary to popular belief, ipsum is not simply random.",
  },
];
export const testimonial = [
  {
    description:
      "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd et erat magna eos",
    name: "Client Name",
    profession: "Profession",
    icon: (
      <i class="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
    ),
    img: "../assets/img/testimonial-1.jpg",
  },
  {
    description:
      "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd et erat magna eos",
    name: "Client Name",
    profession: "Profession",
    icon: (
      <i class="fa fa-quote-right fa-3x text-primary position-absolute end-0 bottom-0 me-4 mb-n1"></i>
    ),
    img: "../assets/img/testimonial-2.jpg",
  },
  {
    description:
      "Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd et erat magna eos",
    name: "Client Name",
    profession: "Profession",
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
subtitle: "authentic rural adventures",
btn1: "Village Tours",
btn2: " book around srilanka tour"
  },
  {
    img: "../assets/img/carousel-2.jpg",
    title: "Discover A Brand Luxurious Hotel",
    subtitle: "luxury living",
    btn1: "Our Room",
    btn2: "Book Room",
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
  { img:('../assets/img/about-2.jpg') },
  { img: ('../assets/img/about-2.jpg') },
  { img: ('../assets/img/about-2.jpg') },
  { img:('../assets/img/about-2.jpg') },
  { img: ('../assets/img/about-2.jpg') },
  { img: ('../assets/img/about-2.jpg') }
];

