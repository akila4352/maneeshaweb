import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CommonHeading from "../common/CommonHeading";

// All images served from /public/assets/...
const tours = [
  {
    img: "/assets/img/sigiriya.jpg",
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
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "ease",
    adaptiveHeight: true,
    centerMode: false,
    variableWidth: false,
    responsive: [
      // ≤1280px → 2 slides
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      // ≤992px → 2 slides (tablets)
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      // ≤768px → 1 slide (phones)
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
      // ≤576px → 1 slide (small phones)
      { breakpoint: 576, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  return (
    <div className="container py-5">
      {/* Only safe customizations — no overrides that fight Slick's widths */}
      <style>{`
        .slick-dots li button:before {
          color: #FFA500 !important;
          opacity: 1 !important;
        }
        .slick-dots li.slick-active button:before {
          color: #FFA500 !important;
          opacity: 1 !important;
        }

        /* Card heights adapt on small screens */
        @media (max-width: 768px) {
          .tour-card,
          .tour-card img {
            min-height: 440px !important;
            height: 440px !important;
          }
        }
      `}</style>

      <CommonHeading
        heading="Destinations in Sri Lanka"
        title="Destinations"
        subtitle="Explore Our"
      />

      <Slider {...settings}>
        {tours.map((tour, idx) => (
          <div key={idx} style={{ padding: "0 10px" }}>
            <div
              className="tour-card"
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
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                  zIndex: 1,
                  filter: "saturate(1) contrast(1.05)",
                }}
              />

              {/* subtle top-to-bottom gradient for legible text */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.6) 100%)",
                  borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 3,
                  padding: "40px 22px 24px",
                }}
              >
                <h3
                  style={{
                    fontWeight: 800,
                    marginBottom: 14,
                    color: "#FFA500",
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {tour.title}
                </h3>
                <p style={{ marginBottom: 18, lineHeight: 1.5 }}>
                  {tour.desc}
                </p>
                <a
                  href="#"
                  style={{
                    color: "#fff",
                    textDecoration: "underline",
                    fontWeight: 600,
                  }}
                >
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
