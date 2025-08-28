import React from "react";
import CommonHeading from "../common/CommonHeading";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Example data
const tours = [
  {
    img: "../assets/img/sigiriya.jpg",
    title: "03 Days Budget Tour",
    desc: "Elephants, tea trails, waterfalls & temples – a quick escape into Kandy’s highlands and heritage.",
  },
  {
    img: "/assets/img/yala.jpg",
    title: "04 Days Budget Tour",
    desc: "Elephants, tea hills, sacred temples & Sigiriya Rock – a quick dive into Sri Lanka’s culture and nature.",
  },
  {
    img: "/assets/img/ella.jpg",
    title: "05 Days Budget Tour",
    desc: "Elephants, tea gardens, historic temples, and beach adventures – a perfect Sri Lankan getaway from Kandy to Colombo.",
  },
  { 
    img: "/assets/img/fort.jpg",
    title: "03 Days Budget Tour",
    desc: "Elephants, tea trails, waterfalls & temples – a quick escape into Kandy’s highlands and heritage.",
  },
  {
    img: "/assets/img/mirissa.jpg",
    title: "04 Days Budget Tour",
    desc: "Elephants, tea hills, sacred temples & Sigiriya Rock – a quick dive into Sri Lanka’s culture and nature.",
  },
  {
    img: "/assets/img/thalpe.jpg",
    title: "04 Days Budget Tour",
    desc: "Elephants, tea hills, sacred temples & Sigiriya Rock – a quick dive into Sri Lanka’s culture and nature.",
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1000 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1000, min: 600 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default function Destination() {
  return (
    <div className="container py-5">
      {/* Custom styles for card shape and overlay */}
      <style>
        {`
          .destination-card {
            background: transparent;
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            overflow: hidden;
            text-align: center;
            color: #fff;
            box-shadow: 0 4px 24px rgba(0,0,0,0.12);
            min-height: 520px;
            height: 520px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            margin-bottom: 32px;
            transition: transform 0.3s;
          }
          .destination-card img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            z-index: 1;
          }
          .destination-card-content {
            position: relative;
            z-index: 2;
            background: rgba(20,20,30,0.6);
            padding: 40px 24px 24px 24px;
            border-bottom-left-radius: 40% 40%;
            border-bottom-right-radius: 40% 40%;
          }
          @media (max-width: 1000px) {
            .destination-card {
              min-height: 400px;
              height: 400px;
            }
            .destination-card img {
              min-height: 400px;
              height: 400px;
            }
          }
        `}
      </style>
      <CommonHeading
        heading="Destinations in Sri Lanka"
        title="Destinations"
        subtitle="Explore Our"
      />
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3500}
        infinite={true}
        arrows={true}
        showDots={true}
        containerClass="carousel-container"
        itemClass="px-2"
      >
        {tours.map((tour, idx) => (
          <div key={idx}>
            <div className="destination-card w-100 mx-auto" style={{maxWidth: "600px"}}>
              <img src={tour.img} alt={tour.title} />
              <div className="destination-card-content">
                <h3 style={{ fontWeight: "bold", marginBottom: "18px", color: "#FFA500" }}>{tour.title}</h3>
                <p style={{ marginBottom: "24px" }}>{tour.desc}</p>
                <a href="#" style={{ color: "#fff", textDecoration: "underline" }}>
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
              