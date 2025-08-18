import React from "react";
import Heading from "../common/Heading";
import { intro } from "../data/Data";

export default function Intro() {
  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h6 className="section-title text-start text-primary text-uppercase">
                About Us
              </h6>
              <h1 className="mb-4">
                Welcome to{" "}
                <span className="text-primary text-uppercase">Travelers</span>
              </h1>
              <p className="mb-4">
                Welcome to Travelers your trusted partner for exploring the
beautiful island of Sri Lanka.

We specialize in creating unforgettable travel experiences for
international visitors, offering complete tour packages, reliable
vehicle rentals, and comfortable accommodation options. Let us
help you discover the wonders of Sri Lanka with ease and comfort
              </p>
            
              <a className="btn btn-primary py-3 px-5 mt-2" href="">
                Explore More
              </a>
            </div>
            <div
              className="col-lg-6 d-flex justify-content-center align-items-center"
              style={{ position: "relative" }}
            >
              {/* Full lighter orange circle shade under the image */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "420px",
                  height: "420px",
                  background: "#FFD580", // lighter orange
                  borderRadius: "50%",
                  opacity: 0.5,
                  zIndex: 0,
                }}
              ></div>
              <div
                style={{
                  position: "relative",
                  width: "380px",
                  height: "380px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1,
                }}
              >
                {/* Outer dashed orange border */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: "4px dashed #FFA500",
                    boxSizing: "border-box",
                    zIndex: 3,
                  }}
                ></div>
                {/* Middle solid orange border (round line) - thicker and no gap */}
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    width: "calc(100% - 16px)",
                    height: "calc(100% - 16px)",
                    borderRadius: "50%",
                    border: "8px solid #FFA500", // increased thickness
                    boxSizing: "border-box",
                    zIndex: 2,
                  }}
                ></div>
                {/* Inner thick white border - directly inside orange line */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    width: "calc(100% - 32px)",
                    height: "calc(100% - 32px)",
                    borderRadius: "50%",
                    border: "10px solid #fff",
                    boxSizing: "border-box",
                    zIndex: 1,
                  }}
                ></div>
                {/* Image - directly inside white border */}
                <img
                  className="img-fluid"
                  src="/assets/img/about-2.jpg"
                  alt="About"
                  style={{
                    borderRadius: "50%",
                    width: "calc(100% - 32px)",
                    height: "calc(100% - 32px)",
                    objectFit: "cover",
                    zIndex: 4,
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
  
