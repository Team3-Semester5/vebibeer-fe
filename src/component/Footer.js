import React from 'react';
import './Footer.css';  // Ensure the CSS path is correct
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer-copyright">
            <div className="container">
                <div className="footer-content">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="single-footer-item">
                                <div className="footer-logo">
                                    <a href="index.html">tour<span>Nest</span></a>
                                    <p>best travel agency</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="single-footer-item">
                                <h2>link</h2>
                                <div className="single-footer-txt">
                                    <p><a href="#">home</a></p>
                                    <p><a href="#">destination</a></p>
                                    <p><a href="#">special packages</a></p>
                                    <p><a href="#">special offers</a></p>
                                    <p><a href="#">blog</a></p>
                                    <p><a href="#">contacts</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="single-footer-item">
                                <h2>popular destination</h2>
                                <div className="single-footer-txt">
                                    <p><a href="#">china</a></p>
                                    <p><a href="#">venezuela</a></p>
                                    <p><a href="#">brazil</a></p>
                                    <p><a href="#">australia</a></p>
                                    <p><a href="#">london</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="single-footer-item text-center">
                                <h2 className="text-left">contacts</h2>
                                <div className="single-footer-txt text-left">
                                    <p>+1 (300) 1234 6543</p>
                                    <p className="foot-email"><a href="#">info@tnest.com</a></p>
                                    <p>North Warner Park 336/A</p>
                                    <p>Newyork, USA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="foot-icons">
                    <ul className="footer-social-links" style={{display: 'flex', left: '50%'}}>
                        <li><a href="#" target="_blank" className="foot-icon-bg-1"><FaFacebook/></a></li>
                        <li><a href="#" target="_blank" className="foot-icon-bg-2"><FaLinkedin/></a></li>
                        <li><a href="#" target="_blank" className="foot-icon-bg-3"><FaInstagram/></a></li>
                    </ul>
                    <p>&copy; 2024 <a href="https://www.themesine.com">ThemeSINE</a>. All Right Reserved</p>
                </div>
                <div id="scroll-Top">
                    <i className="fa fa-angle-double-up return-to-top" id="scroll-top" data-toggle="tooltip" data-placement="top" title="Back to Top"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;