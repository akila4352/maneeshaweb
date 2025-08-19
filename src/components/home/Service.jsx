import React from "react";
import CommonHeading from "../common/CommonHeading";
import { services } from "../data/Data";
import { useNavigate } from "react-router-dom"; // add this import

export default function Services() {
  const navigate = useNavigate(); // add this line

  return (
    <>
      {/* Services section */}
      <div className="container-xxl py-5" id="services">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <CommonHeading
              heading="Our Services"
              title="Services"
              subtitle="Explore Our"
            />
          </div>
          <div className="row g-4">
            {services.map((item, index) => (
              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
                key={index}
              >
                <a
                  className="service-item rounded"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <div className="service-icon bg-transparent border rounded p-1">
                    <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                      {item.icon}
                    </div>
                  </div>
                  <h5 className="mb-3">{item.name}</h5>
                  <p className="text-body mb-0">{item.discription}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations section */}
      <div className="container-xxl py-5" id="destinations">
        {/* Destinations content goes here */}
      </div>
    </>
  );
}
