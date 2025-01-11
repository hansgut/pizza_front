import {Alert, Button, Col, Form, InputGroup, ListGroup, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";

function Checkout() {

  const [cart, setCart] = React.useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const [discountType, setDiscountType] = useState(null);
    const [discountValue, setDiscountValue] = useState(null);



    const calculateTotal = () => {
        return cart.reduce((sum, item) => {
            return sum + (parseFloat(item.price) * item.quantity);
        }, 0);
    };

    const calculateDiscountedTotal = () => {
        if (!discountType || !discountValue) {
            return null;
        }
        const originalTotal = calculateTotal();
        if (discountType === 'Percentage') {
            const discount = (originalTotal * (discountValue / 100));
            return originalTotal - discount;
        }
        return originalTotal;
    };

    const originalTotal = calculateTotal();
    const discountedTotal = calculateDiscountedTotal();

  return (
    <div>
        <Col md={12}>
            <h3>Cart</h3>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ListGroup className="mb-12">
                        {cart.map((cartItem, index) => {
                            const custStr = cartItem.customization ? JSON.stringify(cartItem.customization) : 'null';
                            return (
                                <ListGroup.Item key={`${cartItem.id}-${custStr}-${index}`}>
                                    <Row>
                                        <Col xs={12}>
                                            {cartItem.name} (x{cartItem.quantity})
                                            {cartItem.customization && (
                                                <div style={{ fontSize: '0.9em', color: '#555' }}>
                                                    Size: {cartItem.customization.size}<br />
                                                    Crust: {cartItem.customization.crust}<br />
                                                    Sauce: {cartItem.customization.sauce}<br />
                                                    Cheese: {cartItem.customization.cheese}<br />
                                                    Toppings: {cartItem.customization.toppings.join(', ')}
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col xs={6}>
                                            ${(parseFloat(cartItem.price) * cartItem.quantity).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            );
                        })}
                        <ListGroup.Item>
                            <Row>
                                <Col xs={6}>
                                    <strong>Total</strong>
                                </Col>
                                <Col xs={6} className="text-end">
                                    {discountedTotal && discountedTotal < originalTotal ? (
                                        <>
                          <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>
                            ${originalTotal.toFixed(2)}
                          </span>
                                            <span style={{ color: 'green' }}>
                            ${discountedTotal.toFixed(2)}
                          </span>
                                        </>
                                    ) : (
                                        <strong>${originalTotal.toFixed(2)}</strong>
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    <br/>
                    <ListGroup>

                        <ListGroup.Item>
                            <Form.Group>
                                <Form.Label>Select Payment Method</Form.Label>
                                <div>
                                    <Form.Check
                                        type="radio"
                                        id="paymentBlik"
                                        name="paymentMethod"
                                        label="BLIK"
                                        value="blik"
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="paymentCard"
                                        name="paymentMethod"
                                        label="Card"
                                        value="card"
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="paymentPaypal"
                                        name="paymentMethod"
                                        label="PayPal"
                                        value="paypal"
                                    />
                                </div>
                            </Form.Group>
                        </ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary" className="w-100 mt-2">Proceed</Button>
                </>
            )}
        </Col>
    </div>
  );
}

export default Checkout;