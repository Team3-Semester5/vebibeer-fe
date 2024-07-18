import React from 'react';
import './Footer.css';  // Ensure the CSS path is correct
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer-copyright">
            <div className="container">
                <div className="footer-content">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="single-footer-item" style={{marginLeft :"60px"}}>
                                <div className="footer-logo">
                                    <a href="/">Ve<span>bibeer</span></a>
                                    <p>best travel agency</p>
                                </div>
                            </div>
                        </div>
                     
                        <div className="col-sm-3">
                            <div className="single-footer-item">
                                <h2>popular destination</h2>
                                <div className="single-footer-txt">
                                    <p><a href="#">Đà Nẵng</a></p>
                                    <p><a href="#">Hà Nội</a></p>
                            
                                    <p><a href="#">Đà Lạt</a></p>
                                    <p><a href="#">Nha Trang</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="single-footer-item text-center">
                                <h2 className="text-left">contacts</h2>
                                <div className="single-footer-txt text-left">
                                    <p>+84 799120902</p>
                                    <p ><a href="#">Vebibeer@gmail.com</a></p>
                                    <p>Ngũ Hành Sơn</p>
                                    <p>Đà Nẵng, Việt Nam</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="foot-icons">
                    <ul className="footer-social-links" style={{display: 'flex', marginLeft: '36%'}}>
                        <li><a href="#" target="_blank" className="foot-icon-bg-1"><FaFacebook/></a></li>
                        <li><a href="#" target="_blank" className="foot-icon-bg-2"><FaLinkedin/></a></li>
                        <li><a href="#" target="_blank" className="foot-icon-bg-3"><FaInstagram/></a></li>
                    </ul>
                    <p>&copy; 2024 <a href="#">Vebibeer</a>. All Right Reserved</p>
                </div>
                <div id="scroll-Top">
                    <i className="fa fa-angle-double-up return-to-top" id="scroll-top" data-toggle="tooltip" data-placement="top" title="Back to Top"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;