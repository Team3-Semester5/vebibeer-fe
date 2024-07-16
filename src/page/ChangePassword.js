import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_URL, API_URL1 } from '../constaint/fetchApi';

const ChangePassword = () => {
    const [passwordChange, setPasswordChange] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordChange({ ...passwordChange, [name]: value });
    }

    const handleSubmit = async () => {
        if (passwordChange.newPassword == '' || passwordChange.confirmPassword == '') {
            setError('All fields are required.');
            return;
        }
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const username = params.get('username');
        const token = params.get('token');
        
        try {
            const response = await fetch(`${API_URL}/api/changePassword?username=` + username + "&token="+token, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passwordChange)
            });
            console.log(JSON.stringify(passwordChange));
            alert(response.json());
            navigate('/login');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.message}`);
            }

        } catch (error) {
            setError(error.message);
            console.error('Error adding route:', error);
        }
    }

    return (
        <Container>
            <Form>
                <Form.Group controlId='formNewPassword'>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type='text'
                        name="newPassword"
                        value={passwordChange.newPassword || ''}
                        onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId='formConfirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='text'
                        name="confirmPassword"
                        value={passwordChange.confirmPassword || ''}
                        onChange={handleChange} />
                </Form.Group>

            </Form>
            <Button onClick={handleSubmit}>Save</Button>
        </Container>

    )
}

export default ChangePassword
