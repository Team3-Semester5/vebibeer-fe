import React from 'react';
import './Blog.css'; // Make sure the CSS path is correct

const Blog = () => {
    return (
        <section id="blog" className="blog">
            <div className="container">
                <div className="blog-details">
                    <div  style={{paddingBottom :"50px"}} className="gallary-header text-center">
                        <h2>Latest News</h2>
                        <p>Travel News from all over the world</p>
                    </div>  
                    <div className="columns">
                        <div className="column">
                            <h4>Sustainable Travel on the Rise</h4>
                            <p>Many travelers are now seeking sustainable travel options to minimize their environmental impact. Travel companies are increasing their offerings of eco-friendly tours and accommodations.</p>
                        </div>
                        <div className="column">
                            <h4>New Destinations Opening Up</h4>
                            <p>As travel restrictions ease, new destinations are becoming accessible. Countries like Japan, New Zealand, and several European nations are welcoming tourists again with updated health and safety protocols.</p>
                        </div>
                        <div className="column">
                            <h4>Luxury Travel Boom</h4>
                            <p>There has been a surge in demand for luxury travel experiences. High-end resorts,  itineraries are becoming increasingly popular among affluent travelers seeking unique and exclusive experiences..</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;