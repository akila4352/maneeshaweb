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
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
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
                min-height: 220px !important;
                height: 220px !important;
                max-width: 95vw !important;
                width: 95vw !important;
                margin: 0 auto !important;
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
                    height: "320px",
                    width: "420px",
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
