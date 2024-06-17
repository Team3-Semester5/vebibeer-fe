import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Ensure this is imported if using <Link>
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';

const Menu = () => {
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const user = sessionStorage.getItem("user");

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <div className='container'>
            <div className='row'>
                <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                    <div className="logo">Ve<span style={{ color: '#00B4D8' }}>bibeer</span></div>
                    <ul className="nav-links">
                        <li><a href="http://localhost:3000">Home</a></li>
                        <li><a href="http://localhost:3000/aboutus">About Us</a></li>
                        <li><a href="http://localhost:3000/routeGuest">Tickets</a></li>
                        <li><a href="#subscription">Subscription</a></li>
                        {user == null ? (
                            <li><a href="http://localhost:3000/login" className="book-now">Login</a></li>
                        ) : (
                            <>
                                <li onClick={toggleDropdown} className="dropdown-toggle">
                                    User
                                    <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                                        <a href="#profile">Profile</a>
                                        <a href="#settings">Settings</a>
                                        <a href="http://localhost:3000/logout">Logout</a>
                                    </div>
                                </li>
                                {user.username === "admin" && (
                                    <li>
                                        <Link to={"/admin"} className={"ml-2"}>
                                            <strong>Vào admin</strong>
                                        </Link>
                                    </li>
                                )}
                            </>
                        )}
                        
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Menu;