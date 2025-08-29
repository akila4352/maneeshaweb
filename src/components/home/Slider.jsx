import React from "react";
import { testimonial } from "../data/Data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Sliders() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <div
        className="container-xxl testimonial my-5 py-5 bg-dark wow zoomIn"
        data-wow-delay="0.1s"
      >
        <style>
          {`
            @media (max-width: 992px) {
              .testimonial-item {
                min-height: 240px !important;
                height: auto !important;
                max-width: 98vw !important;
                width: 98vw !important;
                margin: 0 auto !important;
                padding: 1.5rem !important;
              }
              .testimonial-item p {
                font-size: 1rem !important;
                word-break: break-word !important;
              }
            }
            @media (max-width: 600px) {
              .testimonial-item {
                min-height: 260px !important;
                width: 100% !important;
                max-width: 98vw !important;
                margin: 0 auto !important;
                padding: 1.2rem !important;
                box-sizing: border-box !important;
              }
              .testimonial-item p {
                font-size: 0.98rem !important;
                word-break: break-word !important;
              }
              .testimonial-item img {
                width: 36px !important;
                height: 36px !important;
              }
              .testimonial-item h6 {
                font-size: 1rem !important;
              }
              .testimonial-item small {
                font-size: 0.85rem !important;
              }
            }
          `}
        </style>
        <div className="container">
          <div className="owl-carousel testimonial-carousel py-5">
            <Slider {...settings}>
              {testimonial.map((item, key) => (
                <div
                  key={key}
                  className="testimonial-item position-relative bg-white rounded overflow-hidden"
                  style={{
                    minHeight: "320px",
                    height: "auto",
                    width: "420px",
                    maxWidth: "98vw",
                    margin: "0 auto",
                  }}
                >
                  <p>{item.description}</p>
                  <div className="d-flex align-items-center">
                    <img
                      className="img-fluid flex-shrink-0 rounded"
                      src={item.img}
                      style={{ width: "45px", height: "45px" }}
                    />
                    <div className="ps-3">
                      <h6 className="fw-bold mb-1">{item.name}</h6>
                      <small>{item.profession}</small>
                    </div>
                  </div>
                  {item.icon}
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
