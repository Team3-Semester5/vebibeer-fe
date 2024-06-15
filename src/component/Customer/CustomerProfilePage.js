import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

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
  const [changePasswordError, setChangePasswordError] = useState('');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editProfileData, setEditProfileData] = useState({
    fullName: '',
    gender: '',
    nationality: '',
    dob: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPasswordSuccessMessage, setShowPasswordSuccessMessage] = useState(false);
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
          nationality: data.customer_nationality,
          dob: data.customer_dob,
          profilePicture: data.customer_img_ava,
          point: data.point,
        });
        setEditProfileData({
          fullName: data.customer_fullname,
          gender: data.customer_gender,
          nationality: data.customer_nationality,
          dob: data.customer_dob
        });
      } catch (error) {
        setError(error.message);
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      try {
        const response = await fetch(`http://localhost:8080/customer/upload/${userId}`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData({ ...userData, profilePicture: data.customer_img_ava });
        alert('Profile picture updated successfully');
      } catch (error) {
        setError('Error updating profile picture');
        console.error('Error updating profile picture:', error);
      }
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageUpload').click();
  };

  const handleShowEditProfile = () => setShowEditProfile(true);
  const handleCloseEditProfile = () => setShowEditProfile(false);

  const handleShowChangePassword = () => {
    setChangePasswordError('');
    setShowChangePassword(true);
  };
  const handleCloseChangePassword = () => setShowChangePassword(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setChangePasswordError('New password and confirm password do not match');
      return;
    }

    const passwordChangeDTO = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };

    try {
      const response = await fetch(`http://localhost:8080/customer/changePassword/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordChangeDTO)
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get error message from the response
        setChangePasswordError(`HTTP error! status: ${response.status}, message: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      setShowPasswordSuccessMessage(true);
      setTimeout(() => {
        setShowPasswordSuccessMessage(false);
      }, 3000);

      handleCloseChangePassword();
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleEditProfileChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData({
      ...editProfileData,
      [name]: value
    });
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8080/customer/updateProfile/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer_fullname: editProfileData.fullName,
          customer_gender: editProfileData.gender,
          customer_nationality: editProfileData.nationality,
          customer_dob: editProfileData.dob
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const updatedUser = await response.json();
      setUserData({
        ...userData,
        fullName: updatedUser.customer_fullname,
        gender: updatedUser.customer_gender,
        nationality: updatedUser.customer_nationality,
        dob: updatedUser.customer_dob
      });
      handleCloseEditProfile();
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      setError(`Error updating profile: ${error.message}`);
      console.error('Error updating profile:', error);
    }
  };

  return (
    <section style={{ backgroundColor: '#eee', minHeight: '100vh' }}>
      <div className="container py-5">
        {showSuccessMessage && (
          <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
            Updated successfully!
          </Alert>
        )}
        {showPasswordSuccessMessage && (
          <Alert variant="success" onClose={() => setShowPasswordSuccessMessage(false)} dismissible>
            Password changed successfully!
          </Alert>
        )}
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item " aria-current="page">User Profile</li>
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
                  <Button variant="primary" onClick={handleShowChangePassword} className='mr-2'>Change Password</Button>
                  <Button variant="primary" onClick={handleShowEditProfile} style={{marginLeft: 5}}>Edit Profile</Button>
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
                  <div className="col-sm-4">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-8">
                    <p className="text-muted mb-0">{userData.fullName}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-8">
                    <p className="text-muted mb-0">{userData.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-4">
                    <p className="mb-0">Gender</p>
                  </div>
                  <div className="col-sm-8">
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
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Point</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{userData.point} <FontAwesomeIcon icon={faCoins} /></p>
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

      {/* Edit Profile Modal */}
      <Modal show={showEditProfile} onHide={handleCloseEditProfile}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                name="fullName"
                placeholder="Enter full name" 
                value={editProfileData.fullName}
                onChange={handleEditProfileChange}
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control 
                type="text" 
                name="gender"
                placeholder="Enter gender" 
                value={editProfileData.gender}
                onChange={handleEditProfileChange}
              />
            </Form.Group>
            <Form.Group controlId="formNationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control 
                type="text" 
                name="nationality"
                placeholder="Enter nationality" 
                value={editProfileData.nationality}
                onChange={handleEditProfileChange}
              />
            </Form.Group>
            <Form.Group controlId="formDob">
              <Form.Label>DOB</Form.Label>
              <Form.Control 
                type="date" 
                name="dob"
                placeholder="Enter date of birth" 
                value={editProfileData.dob}
                onChange={handleEditProfileChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                placeholder="Enter email" 
                value={userData.email}
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditProfile}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showChangePassword} onHide={handleCloseChangePassword}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {changePasswordError && (
            <div className="alert alert-danger">
              <strong>Error:</strong> {changePasswordError}
            </div>
          )}
          <Form>
            <Form.Group controlId="formOldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter old password" 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter new password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Confirm new password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChangePassword}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangePassword}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
