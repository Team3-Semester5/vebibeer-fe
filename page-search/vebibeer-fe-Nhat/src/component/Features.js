import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate, faBolt, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import './Features.css'

const Features = () => {
    return (
        <div className="container-fluid ">
            <div className='features-container'>
                <div className="row text-center text-md-left"> {/* Adjust text alignment */}
                    <div className="col-md-4 mb-4">
                        <div className="card d-flex flex-row align-items-start"> {/* Use flexbox */}
                            <div className="icon-container p-4"> {/* Container for the icon */}
                                <FontAwesomeIcon icon={faCertificate} size="3x" className="fa-icon text-primary" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Uy tin</h3>
                                <p className="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card d-flex flex-row align-items-start">
                            <div className="icon-container p-4">
                                <FontAwesomeIcon icon={faBolt} size="3x" className="fa-icon text-success" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Nhanh Chong</h3>
                                <p className="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card d-flex flex-row align-items-start">
                            <div className="icon-container p-4">
                                <FontAwesomeIcon icon={faSyncAlt} size="3x" className="fa-icon text-danger" />
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Thay doi</h3>
                                <p className="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Features;