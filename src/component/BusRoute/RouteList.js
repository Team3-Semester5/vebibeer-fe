import React, { useState, useEffect } from 'react';
import RouteItem from './RouteItem';
import './RouteList.css'

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [filterBy, setFilterBy] = useState('All');
  const [sortMethod, setSortMethod] = useState('default');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending


  
  useEffect(() => {
    const fetchRouterList = async () => {
      try {
        const response = await fetch('http://localhost:8080/route');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRoutes(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching customers:', error);
      }
    };

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

    setFilteredRoutes(sortedRoutes);
  }, [sortMethod, sortOrder, routes]);

  const handleSortChange = (method) => {
    setSortMethod(method);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const clearFilters = () => {
    setFilteredRoutes(routes);
    setSortMethod('default');
    setSortOrder('asc');
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
                  <input className="form-check-input" type="radio" name="sort" onChange={() => handleSortChange('latest')} />Giờ đi muộn nhất
                </label>
                <label className="form-validate-label">
                  <input className="form-check-input" type="radio" name="sort" onChange={() => handleSortChange('highestRated')} />  Đánh giá cao nhất
                </label>
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" onChange={() => handleSortChange('priceLowToHigh')} />  Giá tăng dần
                </label>
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" onChange={() => handleSortChange('priceLowToLow')} /> Giá giảm dần
                </label>
              </div>
            </div>
            <div className="section">
              <h4 className="mb-3">Lọc</h4>
              <button className="btn btn-primary" onClick={clearFilters}>Xóa lọc</button>
              <details className="mt-3">
                <summary>Giờ đi</summary>
                <p>Time options...</p>
              </details>
              <details className="mt-3">
                <summary>Nhà xe</summary>
                <p>Bus operator options...</p>
              </details>
              <details className="mt-3">
                <summary>Giá vé</summary>
                <p>Price range options...</p>
              </details>
              <details className="mt-3">
                <summary>Điểm đón</summary>
                <p>Pick-up points...</p>
              </details>
              <details className="mt-3">
                <summary>Điểm trả</summary>
                <p>Drop-off points...</p>
              </details>
              <details className="mt-3">
                <summary>Tiêu chí phổ biến</summary>
                <p>Common criteria...</p>
              </details>
              <details className="mt-3">
                <summary>Vị trí ghế</summary>
                <p>Seat position options...</p>
              </details>
              <details className="mt-3">
                <summary>Loại xe</summary>
                <p>Type of vehicle options...</p>
              </details>
              <details className="mt-3">
                <summary>Loại ghế / giường</summary>
                <p>Types of seats/beds...</p>
              </details>
              <details className="mt-3">
                <summary>Đánh giá</summary>
                <p>Rating filters...</p>
              </details>
            </div>
          </aside>
        </div>
        <div className='col-md-9'>
          {error ? <p>Error fetching routes: {error}</p> : filteredRoutes.map(route => (
            <RouteItem key={route.route_id} route={route} />
          ))}
        </div>
      </div>
    </div>

  );
}

export default RouteList
