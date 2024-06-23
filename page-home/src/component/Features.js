import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faBolt,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Features.css";

const Features = () => {
  return (
    <div className="container-fluid">
      <div className="features-container">
        <div className="row text-center text-md-left">
          <div className="col-12 col-md-4 mb-4">
            <div className="card d-flex flex-row align-items-start">
              <div className="icon-container p-4">
                <FontAwesomeIcon
                  icon={faCertificate}
                  size="3x"
                  className="fa-icon text-primary"
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Trust</h3>
                <p className="card-text">
                  We are dedicated to delivering trustworthy services. With our
                  extensive experience and quality commitment, we ensure your
                  experiences are reliable and satisfying.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-4">
            <div className="card d-flex flex-row align-items-start">
              <div className="icon-container p-4">
                <FontAwesomeIcon
                  icon={faBolt}
                  size="3x"
                  className="fa-icon text-success"
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Speed</h3>
                <p className="card-text">
                  We always meet your needs quickly and efficiently. With a
                  professional team and optimized processes, we are committed to
                  completing all your requests in the shortest possible time.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-4">
            <div className="card d-flex flex-row align-items-start">
              <div className="icon-container p-4">
                <FontAwesomeIcon
                  icon={faSyncAlt}
                  size="3x"
                  className="fa-icon text-danger"
                />
              </div>
              <div className="card-body">
                <h3 className="card-title">Change</h3>
                <p className="card-text">
                  We lead in adapting to change, continually improving our
                  services. By quickly embracing new trends, we innovate to
                  offer the best experiences for our customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
