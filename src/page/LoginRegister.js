import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import bannerSignup from "../assets/images/banner.jpg";
import { useNavigate } from "react-router-dom";
import Menu from "../component/Menu";

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
    const [fullname, setFirstName] = useState("");
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const userData = {
            fullname,
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            alert('Dang ky thanh cong');
            onSwitch();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };



    return (
        <FormWrapper slideIn>
            <Title className="nameF">Vebibeer Signup Form</Title>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        value={fullname}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="username">Email</label>
                    <input
                        type="email"
                        id="username"
                        value={username}
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
    let navigate = useNavigate();
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                alert('Login fail!!!');
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const access_token = data.accessToken;
            localStorage.setItem('accessToken', access_token);
            const user = data.customer;
            sessionStorage.setItem("user", JSON.stringify(user));
            console.log(JSON.parse(sessionStorage.getItem("user")));
            alert('Login Success');
            navigate('/')
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <FormWrapper slideIn reverse>
            <Title>Vebibeer Login Form</Title>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <label htmlFor="username">Email </label>
                    <input
                        type="email"
                        id="username"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormGroup>
                <SubmitButton type="submit">Login</SubmitButton>
            </form>
            <SocialLoginSection>
                <p>Fast Login With Your Favourite Social Profile</p>
                <a className="btn btn-outline-primary" href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect">Login with google</a>
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
    const [isSignup, setIsSignup] = useState(false);
    const [slideIn, setSlideIn] = useState(true);

    const handleSwitch = () => {
        setSlideIn(false);
        setTimeout(() => {
            setIsSignup(!isSignup);
            setSlideIn(true);
        }, 500);
    };

    return (
        <div>
            <Menu />
            <Container bgImage={bannerSignup} >
                {isSignup ? (
                    <SignupForm onSwitch={handleSwitch} />
                ) : (
                    <LoginForm onSwitch={handleSwitch} />
                )}
            </Container>
        </div>

    );
};

export default All;