import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import bannerSignup from "./img/banner.jpg";
import bannerLogin from "./img/banner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

// Keyframes for sliding animations
const slideInFromLeft = keyframes`
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `;

const slideOutToRight = keyframes`
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  `;

const slideOutToLeft = keyframes`
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  `;

const slideInFromRight = keyframes`
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `;

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
`;

const FormWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  padding: 13px; // Increased padding
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  animation: ${(props) => {
    if (props.slideIn && props.reverse)
      return css`
        ${slideInFromRight} 0.5s forwards
      `;
    if (props.slideIn)
      return css`
        ${slideInFromLeft} 0.5s forwards
      `;
    if (props.reverse)
      return css`
        ${slideOutToLeft} 0.5s forwards
      `;
    return css`
      ${slideOutToRight} 0.5s forwards
    `;
  }};
`;

const Title = styled.h2`
  color: #fff;
  font-size: 24px; // Increased font size
  margin-bottom: 20px; // Increased margin
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px; // Increased margin

  label {
    color: #fff;
    font-size: 14px; // Increased font size
    margin-bottom: 5px; // Increased margin
  }

  input {
    padding: 10px; // Increased padding
    border: none;
    border-radius: 4px;
    font-size: 14px; // Increased font size
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px; // Increased padding
  font-size: 14px; // Increased font size
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SocialLoginSection = styled.div`
  margin-top: 20px; // Increased margin
  text-align: center;

  p {
    color: #fff;
    font-size: 14px; // Increased font size
    margin-bottom: 10px; // Increased margin
  }

  button {
    background-color: transparent;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 4px;
    padding: 10px 20px; // Increased padding
    font-size: 14px; // Increased font size
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0 5px; // Increased margin

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const SignupForm = ({ onSwitch }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", {
      firstName,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <FormWrapper slideIn>
      <Title className="nameF">Vebibeer Signup Form</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="firstName">Username</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Register</SubmitButton>
      </form>
      <SocialLoginSection>
        <div>
          <button className="btn-facebook">
            <FontAwesomeIcon icon={faFacebook} className="mr-2" />
            Facebook
          </button>
          <button className="btn-google">
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Google
          </button>
          <button className="btn-twitter">
            <FontAwesomeIcon icon={faTwitter} className="mr-2" />
            Twitter
          </button>
        </div>
      </SocialLoginSection>
      <button
        onClick={onSwitch}
        style={{ color: "black", marginTop: "20px", fontSize: "15px" }}
      >
        Go to Login
      </button>
    </FormWrapper>
  );
};

const LoginForm = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", { email, password });
  };

  return (
    <FormWrapper slideIn reverse>
      <Title>Vebibeer Login Form</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <div>
          <a
            style={{
              marginRight: "19px",

              textDecoration: "underline",
              color: "white",
            }}
            type="radio"
          >
            Forgot password
          </a>
        </div>
        <div style={{ marginTop: "30px" }}>
          <SubmitButton type="submit">Login</SubmitButton>
        </div>
      </form>
      <SocialLoginSection>
        <p>Fast Login With Your Favourite Social Profile</p>
        <div>
          <button className="btn-facebook">
            <FontAwesomeIcon icon={faFacebook} className="mr-2" />
            Facebook
          </button>
          <button className="btn-google">
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Google
          </button>
          <button className="btn-twitter">
            <FontAwesomeIcon icon={faTwitter} className="mr-2" />
            Twitter
          </button>
        </div>
      </SocialLoginSection>
      <button
        onClick={onSwitch}
        style={{
          color: "black",
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        Go to Signup
      </button>
    </FormWrapper>
  );
};

const All = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [slideIn, setSlideIn] = useState(true);

  const handleSwitch = () => {
    setSlideIn(false);
    setTimeout(() => {
      setIsSignup(!isSignup);
      setSlideIn(true);
    }, 500);
  };

  return (
    <Container bgImage={isSignup ? bannerSignup : bannerLogin}>
      {isSignup ? (
        <SignupForm onSwitch={handleSwitch} />
      ) : (
        <LoginForm onSwitch={handleSwitch} />
      )}
    </Container>
  );
};

export default All;
