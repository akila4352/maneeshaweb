import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselData } from "../data/Data";
import { useNavigate } from "react-router-dom";

export default function Carousel() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // disable default slick arrows
  };

  return (
    <>
      <div
        className="carousel-wrapper"
        style={{ position: "relative", marginTop: "0px", width: "100vw" }}
      >
        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ minHeight: "100vh", width: "100vw" }}
        >
          <div className="carousel-inner">
            <Slider ref={sliderRef} {...settings}>
              {carouselData.map((val, index) => (
                <div className="carousel-item" key={index}>
                  <img className="w-100" src={val.img} alt="Image" />
                  <div
                    className="carousel-caption d-flex flex-column align-items-center justify-content-center"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      background: "rgba(15,23,43,0.7)",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <div className="p-3" style={{ maxWidth: "700px" }}>
                      <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">
                        {val.subtitle}
                      </h6>
                      <h1 className="display-3 text-white mb-4 animated slideInDown">
                        {val.title}
                      </h1>
                      <a
                        href="#"
                        className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(val.navigatePath);
                        }}
                      >
                        {val.btn1}
                      </a>
                      <a
                        href="#"
                        className="btn btn-light py-md-3 px-md-5 animated slideInRight"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(val.navigatePath);
                        }}
                      >
                        {val.btn2}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Custom Prev & Next Arrows */}
          <button
            onClick={previous}
            style={{
              position: "absolute",
              top: "50%",
              left: "20px",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "rgba(0,0,0,0.5)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            &#10094;
          </button>

          <button
            onClick={next}
            style={{
              position: "absolute",
              top: "50%",
              right: "20px",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "rgba(0,0,0,0.5)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            &#10095;
          </button>
        </div>
      </div>
    </>
  );
}
