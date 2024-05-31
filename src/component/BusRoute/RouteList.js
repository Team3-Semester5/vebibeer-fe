import React, { useState, useEffect } from 'react';
import RouteItem from './RouteItem';
import './RouteList.css'

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [filterBy, setFilterBy] = useState('All');



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


  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          <aside className="sidebar">
            <div className="section">
              <h4 className="mb-3">Sắp xếp</h4>
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" defaultChecked /> Mặc định
                </label>
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" /> Giờ đi sớm nhất
                </label>
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" /> Giờ đi muộn nhất
                </label>
                <label className="form-validate-label">
                  <input className="form-check-input" type="radio" name="sort" /> Đánh giá cao nhất
                </label>
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" /> Giá tăng dần
                </label>
                <label className="form-check-label">
                  <input className="form-check-input" type="radio" name="sort" /> Giá giảm dần
                </label>
              </div>
            </div>
            <div className="section">
              <h4 className="mb-3">Lọc</h4>
              <button className="btn btn-primary">Xóa lọc</button>
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
          {routes.map(route => (
            <RouteItem key={route.route_id} route={route} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RouteList
