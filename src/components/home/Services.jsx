import React from "react";
import { services } from "../data/Data";

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-4" key={index}>
              <div className="service-item text-center">
                <div className="service-icon mb-3">
                  {service.icon}
                </div>
                <h4 className="service-title mb-3">{service.name}</h4>
                <p className="service-description">{service.discription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}