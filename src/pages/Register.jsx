import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeat_password: '',
        first_name: '',
        last_name: '',
        profile: {
            phone_number: '',
            date_of_birth: ''
        }
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the field belongs to profile
        if (name === 'phone_number' || name === 'date_of_birth') {
            setFormData((prev) => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    [name]: value
                }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Check if passwords match
        if (formData.password !== formData.repeat_password) {
            setErrorMessage('Passwords do not match. Please try again.');
            return;
        }

        // Create a copy of the form data without the repeat_password field
        const { repeat_password, ...submitData } = formData;

        // Here you would typically send submitData to your backend API
        console.log('Submitted JSON:', submitData);
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Register</h2>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formRepeatPassword" className="mb-3">
                            <Form.Label>Repeat Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="repeat_password"
                                value={formData.repeat_password}
                                onChange={handleChange}
                                placeholder="Repeat your password"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formFirstName" className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formLastName" className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoneNumber" className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone_number"
                                value={formData.profile.phone_number}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDateOfBirth" className="mb-3">
                            <Form.Label>Date of Birth (Optional)</Form.Label>
                            <Form.Control
                                type="date"
                                name="date_of_birth"
                                value={formData.profile.date_of_birth}
                                onChange={handleChange}
                                placeholder="YYYY-MM-DD"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Register
                        </Button>
                        <Button href="/login" variant="secondary" type="button" className="w-100 mt-2">
                            Login
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
