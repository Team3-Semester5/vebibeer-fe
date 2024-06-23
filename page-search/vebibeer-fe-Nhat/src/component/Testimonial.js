import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { FaQuoteLeft } from 'react-icons/fa';
import './Testimonial.css'; // Ensure you have this CSS file for additional styles

const testimonials = [
    {
        id: 1,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        name: "Jane Doe",
        location: "New York, USA",
        imgSrc: "/assets/images/clients/testimonial1.jpg"
    },
    {
        id: 2,
        quote: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        name: "John Smith",
        location: "California, USA",
        imgSrc: "/assets/testimonial2.jpg"
    },
    {
        id: 3,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        name: "Jane Doe",
        location: "New York, USA",
        imgSrc: "/assets/images/clients/testimonial1.jpg"
    },
    {
        id: 4,
        quote: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        name: "John Smith",
        location: "California, USA",
        imgSrc: "/assets/testimonial2.jpg"
    },
    {
        id: 5,
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        name: "Jane Doe",
        location: "New York, USA",
        imgSrc: "/assets/images/clients/testimonial1.jpg"
    },
    {
        id: 6,
        quote: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        name: "John Smith",
        location: "California, USA",
        imgSrc: "/assets/testimonial2.jpg"
    }
];

const TestimonialCarousel = () => {
    return (
        <section className="testimonial">
            <div className="container">
                <div className='gallary-header text-center'>
                    <h2 className="text-center">Clients Reviews</h2>
                    <p className="text-center description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                </div>

                <OwlCarousel className='owl-carousel owl-theme' autoplay={true} dots={true}>
                    {testimonials.map((testimonial) => (
                        <div className="item home1-testm" key={testimonial.id}>
                            <div className="home1-testm-single text-center">
                                <div className="home1-testm-img">

                                    <img src={testimonial.imgSrc} alt="testimonial" />

                                </div>
                                <div className="home1-testm-txt">
                                    <span className="icon section-icon">
                                        <FaQuoteLeft />
                                    </span>
                                    <p>{testimonial.quote}</p>
                                    <h3><a>{testimonial.name}</a></h3>
                                    <h4>{testimonial.location}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            </div>
        </section>
    );
};

export default TestimonialCarousel;