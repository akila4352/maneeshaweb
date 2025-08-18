import React from "react";
import { socialIcons } from "../data/Data";

export default function SocialIcons() {
  return (
    <>
      <div className="col-lg-3 px-5">
        <div className="d-inline-flex align-items-center py-2">
          {socialIcons.map((val, index) => (
            <div key={index}>
              <a
                className="me-3"
                href={val.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {val.icon}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
