import React from 'react';
import './Blog.css'; // Make sure the CSS path is correct

const Blog = () => {
    return (
        <section id="blog" className="blog">
            <div className="container">
                <div className="blog-details">
                    <div className="gallary-header text-center">
                        <h2>latest news</h2>
                        <p>Travel News from all over the world</p>
                    </div>
                    <div className="blog-content">
                        <div className="row">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="col-sm-4 col-md-4">
                                    <div className="thumbnail">
                                        <h2>trending news <span>15 november 2017</span></h2>
                                        <div className="thumbnail-img">
                                            <img src={`../assets/images/blog/b${item}.jpg`} alt={`blog-img-${item}`} />
                                            <div className="thumbnail-img-overlay"></div>
                                        </div>
                                        <div className="caption">
                                            <div className="blog-txt">
                                                <h3>
                                                    <a href="#">Discover on beautiful weather, Fantastic foods and historical place in {item === 1 ? 'Prag' : item === 2 ? 'India' : 'Natural places'}</a>
                                                </h3>
                                                <p>Lorem ipsum dolor sit amet, contur adip elit, sed do mod incid ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                                <a href="#">Read More</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;