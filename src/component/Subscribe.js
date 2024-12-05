import React, { useState } from 'react';
import './Subscribe.css'; // Ensure the CSS path is correct

const Subscribe = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Assuming you have a method to handle the subscription logic
        alert(`Subscription request sent for: ${email}`); // Placeholder action
        setEmail(''); // Reset email input after submit
    };

    return (
        <section id="subs" className="subscribe">
            <div className="container">
                <div className="subscribe-title text-center">
                    <h2>Join our Subscribers List to Get Regular Update</h2>
                    <p>Subscribe Now. We will send you Best offer for your Trip</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div className="custom-input-group">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Enter your Email Here"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                                <button type="submit" className="appsLand-btn subscribe-btn">Subscribe</button>
                                <div className="clearfix"></div>
                                <i className="fa fa-envelope"></i>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Subscribe;