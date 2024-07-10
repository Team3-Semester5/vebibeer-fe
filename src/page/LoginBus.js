import React, { useState } from 'react'
import { Button, Form, FormGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const LoginBus = () => {

    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const busData = {
            username,
            password,
        };
        alert(busData.username);
        try {
            const response = await fetch('http://localhost:8080/api/bus/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(busData),
            });

            if (!response.ok) {
                alert('Login fail!!!');
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const access_token = data.accessToken;
            localStorage.setItem('accessToken', access_token);
            const user = data.busCompany;
            sessionStorage.setItem("user", JSON.stringify(user));
            console.log(JSON.parse(sessionStorage.getItem("user")));
            alert('Login Success');
            navigate('/bus')
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


return (
    <Form >
        <FormGroup>
            <label htmlFor="username">Email </label>
            <input
                type="text"
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
        <Button onClick={handleSubmit}>Login</Button>
    </Form>
)
}

export default LoginBus
