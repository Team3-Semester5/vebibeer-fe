import React, { useState, useEffect } from 'react';
import './DiscountOffer.css'; // Make sure to include your CSS styles

const DiscountOffer = () => {
    const dayEnd = 'July 21, 2024';
    const deadline = new Date(dayEnd).getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const t = deadline - now;

            let days = Math.floor(t / (1000 * 60 * 60 * 24));
            let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((t % (1000 * 60)) / 1000);

            if (t < 0) {
                clearInterval(timer);
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            }

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="discount-offer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="dicount-offer-content text-center">
                            <h2>Join with us within {dayEnd} and get upto 40% Discount</h2>
                            <div className="campaign-timer">
                                <div id="timer">
                                    <div className="time time-after" id="days">
                                        <span>{timeLeft.days}</span> Days
                                    </div>
                                    <div className="time time-after" id="hours">
                                        <span>{timeLeft.hours}</span> Hours
                                    </div>
                                    <div className="time time-after" id="minutes">
                                        <span>{timeLeft.minutes}</span> Minutes
                                    </div>
                                    <div className="time" id="seconds">
                                        <span>{timeLeft.seconds}</span> Seconds
                                    </div>
                                </div>
                            </div>
                            <div className="about-btn">
                                <button className="about-view discount-offer-btn">
                                    Join now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiscountOffer;