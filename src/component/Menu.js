import React, { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';

const Menu = () => {
	const [scrolled, setScrolled] = useState(false);

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

	return (
		<div className='container'>
			<div className='row'>
				<nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
					<div className="logo">Ve<span style={{ color: '#00B4D8' }}>bibeer</span></div>
					<ul className="nav-links">
						<li><a href="#home">Home</a></li>
						<li><a href="#destination">Destination</a></li>
						<li><a href="#packages">Packages</a></li>
						<li><a href="#offers">Special Offers</a></li>
						<li><a href="#blog">Blog</a></li>
						<li><a href="#subscription">Subscription</a></li>
						<li><a href="#book" className="book-now">Book Now</a></li>
					</ul>
				</nav>
			</div>

		</div>

	);
};

export default Menu
