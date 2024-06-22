import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure this is imported if using <Link>
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';

const Menu = () => {
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const accessToken = localStorage.getItem("accessToken");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // console.log(user.customer_id);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleLogout = () => {
        sessionStorage.setItem("user", null);
        navigate("")
        alert('success');
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
                                    <a>{user.username}</a>
                                    <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                                        <a href="http://localhost:3000/profile">Profile</a>
                                        <a href="http://localhost:3000/setting">Settings</a>
                                        <a onClick={handleLogout}>Logout</a>
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