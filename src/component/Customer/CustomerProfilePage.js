import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    gender: '',
    nationality: '',
    dob: '',
    profilePicture: '',
    point: '',
  });
  const [error, setError] = useState(null);
  const userId = 1; // Giả sử bạn biết ID người dùng là 1. Bạn có thể lấy ID này từ session hoặc URL.

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/customer/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData({
          fullName: data.customer_fullname,
          email: data.username,
          gender: data.customer_gender,
          nationality: data.nationality,
          dob: data.customer_dob,
          profilePicture: data.customer_img_ava,
          point: data.point
        });
      } catch (error) {
        setError(error.message);
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData({ ...userData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageUpload').click();
  };

  return (
    <section style={{ backgroundColor: '#eee', minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={userData.profilePicture || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '180px', cursor: 'pointer' }}
                  onClick={handleImageClick}
                />
                <h5 className="my-3">Full Stack Developer</h5>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-primary">Follow</button>
                  <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                </div>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.fullName}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Gender</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.gender}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Nationality</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.nationality}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">DOB</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.dob}</p>
                  </div>
                </div>
                {error && (
                  <div className="alert alert-danger mt-3">
                    <strong>Error:</strong> {error}
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                {/* Nội dung thêm vào đây nếu cần */}
              </div>

              <div className="col-md-6">
                {/* Nội dung thêm vào đây nếu cần */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
