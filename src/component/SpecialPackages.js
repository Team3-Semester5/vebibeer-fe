import React from 'react';
import PackageCard from './PackageCard';
import './SpecialPackages.css'; // Custom CSS for layout and styling

const SpecialPackages = () => {
  const packages = [
    { id: 1, destination: 'Italy', price: 499, daysNights: '5 Days 6 Nights', accommodation: '5 Star Accommodation', transportation: 'Transportation', foodFacilities: 'Food Facilities', reviews: '2544', imageSrc: '../assets/images/packages/p1.jpg' },
    { id: 2, destination: 'England', price: 1499, daysNights: '5 Days 6 Nights', accommodation: '5 Star Accommodation', transportation: 'Transportation', foodFacilities: 'Food Facilities', reviews: '2544', imageSrc: '../assets/images/packages/p2.jpg' },
    { id: 3, destination: 'France', price: 1199, daysNights: '5 Days 6 Nights', accommodation: '5 Star Accommodation', transportation: 'Transportation', foodFacilities: 'Food Facilities', reviews: '2544', imageSrc: '../assets/images/packages/p3.jpg' },
    { id: 1, destination: 'Italy', price: 499, daysNights: '5 Days 6 Nights', accommodation: '5 Star Accommodation', transportation: 'Transportation', foodFacilities: 'Food Facilities', reviews: '2544', imageSrc: '../assets/images/packages/p1.jpg' },
    { id: 2, destination: 'England', price: 1499, daysNights: '5 Days 6 Nights', accommodation: '5 Star Accommodation', transportation: 'Transportation', foodFacilities: 'Food Facilities', reviews: '2544', imageSrc: '../assets/images/packages/p2.jpg' },
    { id: 3, destination: 'France', price: 1199, daysNights: '5 Days 6 Nights', accommodation: '5 Star Accommodation', transportation: 'Transportation', foodFacilities: 'Food Facilities', reviews: '2544', imageSrc: '../assets/images/packages/p3.jpg' },
    // Add other packages similarly...
  ];

  return (
    <section className="packages">
      <div className="container">
        <div className="gallery-header text-center">
          <h2>special packages</h2>
          <p>Duis aute irure dolor in velit esse cillum dolore eu fugiat nulla.</p>
        </div>
        <div className="packages-content">
          <div className="row">
            {packages.map(pkg => (
              <div key={pkg.id} className="col-md-4 col-sm-6">
                <PackageCard {...pkg} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialPackages;