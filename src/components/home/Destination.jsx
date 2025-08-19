import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CommonHeading from "../common/CommonHeading";
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

export default function Destination() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ],
  };

  return (
    <div className="container py-5">
      {/* Orange color for slider dots */}
      <style>
        {`
          .slick-dots li button:before {
            color: #FFA500 !important;
            opacity: 1 !important;
          }
          .slick-dots li.slick-active button:before {
            color: #FFA500 !important;
            opacity: 1 !important;
          }
        `}
      </style>
      <CommonHeading
        heading="Destinations in Sri Lanka"
        title="Destinations"
        subtitle="Explore Our"
      />
      <Slider {...settings}>
        {tours.map((tour, idx) => (
          <div key={idx} style={{ padding: "0 10px" }}>
            <div
              style={{
                background: "transparent",
                borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                overflow: "hidden",
                textAlign: "center",
                color: "#fff",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                minHeight: "520px",
                height: "520px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <img
                src={tour.img}
                alt={tour.title}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  background: "rgba(20,20,30,0.6)",
                  padding: "40px 24px 24px 24px",
                  borderBottomLeftRadius: "40% 40%",
                  borderBottomRightRadius: "40% 40%",
                }}
              >
               <h3 style={{ fontWeight: "bold", marginBottom: "18px", color: "#FFA500" }}>{tour.title}</h3>
                <p style={{ marginBottom: "24px" }}>{tour.desc}</p>
                <a href="#" style={{ color: "#fff", textDecoration: "underline" }}>
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

