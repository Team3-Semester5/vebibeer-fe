import React from 'react';
import './VerifyEmail.css';
import emailverify from '../assets/images/emailverify.png';


function VerifyChangePassword() {
  return (
    <div className="email-verification">
      <div className="content1">
        <img src={emailverify} alt="Email Icon" className="email-icon" />
        <h1 className='oke'>Xác nhận email của bạn</h1>
        <p>Chúng tôi đã gửi email tới <strong>your-email@example.com</strong> để xác minh địa chỉ email của bạn và kích hoạt tài khoản của bạn.</p>
        <a href="#" className="resend-link">Bấm vào đây</a> nếu bạn không nhận được email hoặc muốn thay đổi địa chỉ email bạn đã đăng ký.
      </div>
    </div>
  );
}

export default VerifyChangePassword;