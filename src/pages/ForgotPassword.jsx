import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Simulate form submission
        console.log('Password reset requested for:', email);
        setSubmitted(true);
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <h2 className="text-center mb-4">Forgot Password</h2>
                    {submitted ? (
                        <Alert variant="success" className="text-center">
                            If an account exists with the entered email, you will receive a password reset link.
                        </Alert>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Send Password Reset Link
                            </Button>
                            <Button href="/login" variant="secondary" type="button" className="w-100 mt-2">
                                Back to Login
                            </Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ForgotPassword;
