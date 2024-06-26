import React, { useState, useEffect } from 'react';
import RouteItem from './RouteItem';
import './RouteList.css';
import 'react-datepicker/dist/react-datepicker.css';
import ReactSlider from 'react-slider';

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [sortMethod, setSortMethod] = useState('default');
  const [sortOrder, setSortOrder] = useState('asc');
  const [busOperators, setBusOperators] = useState([]);
  const [selectedOperators, setSelectedOperators] = useState([]);
  const [searchOperator, setSearchOperator] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [pickupPoints, setPickupPoints] = useState([]);
  const [dropoffPoints, setDropoffPoints] = useState([]);
  const [selectedPickupPoints, setSelectedPickupPoints] = useState([]);
  const [selectedDropoffPoints, setSelectedDropoffPoints] = useState([]);
  const [searchPickup, setSearchPickup] = useState('');
  const [searchDropoff, setSearchDropoff] = useState('');
  const [selectedRating, setSelectedRating] = useState(null);
  const [timeRange, setTimeRange] = useState([0, 1440]);

  useEffect(() => {
    const fetchRouterList = async () => {
      try {
        const response = await fetch('http://localhost:8080/route');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRoutes(data);
        const uniquePickupPoints = [...new Set(data.map(route => route.startLocation.location_name))];
        const uniqueDropoffPoints = [...new Set(data.map(route => route.endLocation.location_name))];
        setPickupPoints(uniquePickupPoints);
        setDropoffPoints(uniqueDropoffPoints);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching routes:', error);
      }
    };

    const fetchBusOperators = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/buscompanies');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBusOperators(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching bus operators:', error);
      }
    };

    fetchBusOperators();
    fetchRouterList();
  }, []);

  useEffect(() => {
    let sortedRoutes = [...routes];

    const compare = (a, b, isAscending) => {
      const factor = isAscending ? 1 : -1;
      switch (sortMethod) {
        case 'earliest':
          return factor * (new Date(a.route_startTime) - new Date(b.route_startTime));
        case 'latest':
          return factor * (new Date(b.route_startTime) - new Date(a.route_startTime));
        case 'highestRated':
          return factor * ((b.amount_star || 0) - (a.amount_star || 0));
        case 'priceLowToHigh':
          return factor * ((a.ticket_price || 0) - (b.ticket_price || 0));
        case 'priceHighToLow':
          return factor * ((b.ticket_price || 0) - (a.ticket_price || 0));
        default:
          return factor * (a.route_id - b.route_id);
      }
    };

    sortedRoutes.sort((a, b) => compare(a, b, sortOrder === 'asc'));

    if (selectedOperators.length > 0) {
      sortedRoutes = sortedRoutes.filter(route => selectedOperators.includes(route.busCompany_name));
    }

    // sortedRoutes = sortedRoutes.filter(route => 
    //   route.ticket_price != null && 
    //   !isNaN(route.ticket_price) && 
    //   route.ticket_price >= priceRange[0] && 
    //   route.ticket_price <= priceRange[1]
    // );

    if (selectedPickupPoints.length > 0) {
      sortedRoutes = sortedRoutes.filter(route => selectedPickupPoints.includes(route.startLocation.location_name));
    }

    if (selectedDropoffPoints.length > 0) {
      sortedRoutes = sortedRoutes.filter(route => selectedDropoffPoints.includes(route.endLocation.location_name));
    }

    if (selectedRating !== null) {
      sortedRoutes = sortedRoutes.filter(route => route.amount_star >= selectedRating);
    }

    // Convert time range from minutes to HH:MM format
    sortedRoutes = sortedRoutes.filter(route => {
      const routeStartMinutes = new Date(route.route_startTime).getHours() * 60 + new Date(route.route_startTime).getMinutes();
      return routeStartMinutes >= timeRange[0] && routeStartMinutes <= timeRange[1];
    });

    setFilteredRoutes(sortedRoutes);
  }, [sortMethod, sortOrder, routes, selectedOperators, priceRange, selectedPickupPoints, selectedDropoffPoints, selectedRating, timeRange]);

  const handleSortChange = (method) => {
    setSortMethod(method);
  };

  const handleOperatorSelect = (operator) => {
    setSelectedOperators((prev) =>
      prev.includes(operator) ? prev.filter((op) => op !== operator) : [...prev, operator]
    );
  };

  const handlePickupSelect = (point) => {
    setSelectedPickupPoints((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]
    );
  };

  const handleDropoffSelect = (point) => {
    setSelectedDropoffPoints((prev) =>
      prev.includes(point) ? prev.filter((p) => p !== point) : [...prev, point]
    );
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  const handleTimeChange = (value) => {
    setTimeRange(value);
  };

  const formatMinutesToHHMM = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const clearFilters = () => {
    setFilteredRoutes(routes);
    setSortMethod('default');
    setSortOrder('asc');
    setSelectedOperators([]);
    setSearchOperator('');
    setPriceRange([0, 2000000]);
    setSelectedPickupPoints([]);
    setSelectedDropoffPoints([]);
    setSearchPickup('');
    setSearchDropoff('');
    setSelectedRating(null);
    setTimeRange([0, 1440]);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          <aside className="sidebar">
            <div className="section">
              <h4 className="mb-3">Sắp xếp</h4>
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" onChange={() => handleSortChange('default')} defaultChecked /> Mặc định
                </label>
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" onChange={() => handleSortChange('earliest')} /> Giờ đi sớm nhất
                </label>
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" onChange={() => handleSortChange('latest')} /> Giờ đi muộn nhất
                </label>
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" onChange={() => handleSortChange('highestRated')} /> Đánh giá cao nhất
                </label>
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" onChange={() => handleSortChange('priceLowToHigh')} /> Giá tăng dần
                </label>
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" onChange={() => handleSortChange('priceHighToLow')} /> Giá giảm dần
                </label>
              </div>
            </div>
            <div className="section">
              <h4 className="mb-3">Lọc</h4>
              <button className="btn btn-primary" onClick={clearFilters}>Xóa lọc</button>
              <details className="mt-3">
                <summary>Giờ đi</summary>
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  min={0}
                  max={1440}
                  step={15}
                  value={timeRange}
                  onChange={handleTimeChange}
                />
                <div className="time-range">
                  <div className="time-input">
                    <label>Từ</label>
                    <input type="text" readOnly value={formatMinutesToHHMM(timeRange[0])} />
                  </div>
                  <div className="time-input">
                    <label>Đến</label>
                    <input type="text" readOnly value={formatMinutesToHHMM(timeRange[1])} />
                  </div>
                </div>
              </details>
              <details className="mt-3">
                <summary>Nhà xe</summary>
                <input
                  type="text"
                  placeholder="Tìm trong danh sách"
                  value={searchOperator}
                  onChange={(e) => setSearchOperator(e.target.value)}
                  className="form-control mb-2"
                />
                {busOperators
                  .filter((operator) =>
                    operator.busCompany_name && operator.busCompany_name.toLowerCase().includes(searchOperator.toLowerCase())
                  )
                  .map((operator) => (
                    <div key={operator.busCompany_name} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedOperators.includes(operator.busCompany_name)}
                        onChange={() => handleOperatorSelect(operator.busCompany_name)}
                      />
                      <label className="form-check-label">{operator.busCompany_name}</label>
                    </div>
                  ))}
              </details>
              <details className="mt-3">
                <summary>Giá vé</summary>
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  defaultValue={[0, 2000000]}
                  min={0}
                  max={2000000}
                  step={100000}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value)}
                  renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                />
                <div className="price-range">
                  <span>{priceRange[0].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                  <span>{priceRange[1].toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
              </details>
              <details className="mt-3">
                <summary>Điểm đón</summary>
                <input
                  type="text"
                  placeholder="Tìm trong danh sách"
                  value={searchPickup}
                  onChange={(e) => setSearchPickup(e.target.value)}
                  className="form-control mb-2"
                />
                {pickupPoints
                  .filter((point) =>
                    point.toLowerCase().includes(searchPickup.toLowerCase())
                  )
                  .map((point) => (
                    <div key={point} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedPickupPoints.includes(point)}
                        onChange={() => handlePickupSelect(point)}
                      />
                      <label className="form-check-label">{point}</label>
                    </div>
                  ))}
              </details>
              <details className="mt-3">
                <summary>Điểm trả</summary>
                <input
                  type="text"
                  placeholder="Tìm trong danh sách"
                  value={searchDropoff}
                  onChange={(e) => setSearchDropoff(e.target.value)}
                  className="form-control mb-2"
                />
                {dropoffPoints
                  .filter((point) =>
                    point.toLowerCase().includes(searchDropoff.toLowerCase())
                  )
                  .map((point) => (
                    <div key={point} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedDropoffPoints.includes(point)}
                        onChange={() => handleDropoffSelect(point)}
                      />
                      <label className="form-check-label">{point}</label>
                    </div>
                  ))}
              </details>
              <details className="mt-3">
                <summary>Đánh giá</summary>
                <div className="rating-filter">
                  {[4, 3].map(rating => (
                    <div key={rating} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedRating === rating}
                        onChange={() => handleRatingSelect(rating)}
                      />
                      <label className="form-check-label">
                        {[...Array(5)].map((_, index) => (
                          <span key={index} className={index < rating ? 'star filled' : 'star'}>★</span>
                        ))}
                        trở lên
                      </label>
                    </div>
                  ))}
                </div>
              </details>
              {/* Add other filter sections as needed */}
            </div>
          </aside>
        </div>
        <div className='col-md-9'>
          {error ? (
            <p>Error fetching routes: {error}</p>
          ) : (
            filteredRoutes.length > 0 ? (
              filteredRoutes.map(route => (
                <RouteItem key={route.route_id} route={route} />
              ))
            ) : (
              <p>No routes available</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteList;