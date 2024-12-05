import React, { useState, useRef } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './BusCarousel.css';  // Assuming custom styles are placed here

const BusCarousel = ({ route }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);  // Create a ref for the carousel

    const busImages = [
        { id: 1, url: route.car.car_imgUrl1, thumbnail: route.car.car_imgUrl1, description: 'Description 1' },
        { id: 2, url: route.car.car_imgUrl2, thumbnail: route.car.car_imgUrl2, description: 'Description 2' },
        { id: 3, url: route.car.car_imgUrl3, thumbnail: route.car.car_imgUrl3, description: 'Description 3' },
        { id: 4, url: route.car.car_imgUrl4, thumbnail: route.car.car_imgUrl4, description: 'Description 4' },
        { id: 5, url: route.car.car_imgUrl5, thumbnail: route.car.car_imgUrl5, description: 'Description 5' },
        { id: 6, url: route.car.car_imgUrl6, thumbnail: route.car.car_imgUrl6, description: 'Description 6' }
    ].filter(image => image.url != null);

    const options = {
        items: 1,
        center: true,
        margin: 10,
        URLhashListener: true,
        autoplayHoverPause: true,
        autoplay: false,
        startPosition: 'URLHash',
        // onTranslated: function (event) {
        //     setActiveIndex(event.item.index);
        // }
    };

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
        carouselRef.current.to(index, 300);  // Use the `to` method to navigate
    };

    return (
        <div>
            <OwlCarousel className="owl-theme" ref={carouselRef} {...options}>
                {busImages.map((item, index) => (
                    <div key={index} className="item">
                        <img src={item.url} alt={item.description} />
                    </div>
                ))}
            </OwlCarousel>
            <div className="thumbnails">
                {busImages.map((item, index) => (
                    <img
                        key={index}
                        src={item.thumbnail}
                        alt={`Thumbnail for ${item.description}`}
                        className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BusCarousel;