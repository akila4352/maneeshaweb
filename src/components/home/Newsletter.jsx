import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { rtdb } from "../../firebase/firebase";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await push(ref(rtdb, "newsletterInbox"), {
        email,
        time: new Date().toISOString(),
      });
      setEmail("");
    } catch (err) {
      // Optionally handle error
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="container newsletter mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="row justify-content-center">
          <div className="col-lg-10 border rounded p-1">
            <div className="border rounded text-center p-1">
              <div className="bg-white rounded text-center p-5">
                <h4 className="mb-4">
                  join now{" "}
                  <span className="text-primary text-uppercase">
                    for latest updates
                  </span>
                </h4>
                <div
                  className="position-relative mx-auto"
                  style={{ maxWidth: "400px" }}
                >
                  <input
                    className="form-control w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
