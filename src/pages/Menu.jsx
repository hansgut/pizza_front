import React, { useEffect, useState } from 'react';
import {
    Container, Row, Col, Card, Form, Button, ListGroup, Alert, InputGroup, Modal
} from 'react-bootstrap';

function MenuPage() {
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [cart, setCart] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');
    const [discountType, setDiscountType] = useState(null);
    const [discountValue, setDiscountValue] = useState(null);

    // Pizza configuration data
    const [pizzaSizes, setPizzaSizes] = useState([]);
    const [crustTypes, setCrustTypes] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [toppings, setToppings] = useState([]);

    // Modal states for pizza customization
    const [showModal, setShowModal] = useState(false);
    const [currentPizza, setCurrentPizza] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedCrust, setSelectedCrust] = useState('');
    const [selectedSauce, setSelectedSauce] = useState('');
    const [selectedCheese, setSelectedCheese] = useState('');
    const [selectedToppings, setSelectedToppings] = useState([]);

    useEffect(() => {
        const menuData = [
            {
                "id": 1,
                "name": "Pepperoni",
                "description": "Just pepperoni pizza",
                "price": "25.00",
                "is_pizza": true,
                "is_active": true,
                "category": 3,
                "image": "https://www.cobsbread.com/us/wp-content//uploads/2022/09/Pepperoni-pizza-850x630-1.png"
            },
            {
                "id": 2,
                "name": "Margarita",
                "description": "Cheese and tomato",
                "price": "20.00",
                "is_pizza": true,
                "is_active": true,
                "category": 3,
                "image": "https://ocdn.eu/pulscms-transforms/1/RM4k9kqTURBXy8wNmQzYjQ5YzA2MzRiYTVkZTg2N2M3NjFiYjBjZGFmNC5qcGVnk5UDAB_NA-jNAjKVAs0EsADDw5MJpjY5NDQyYwbeAAGhMAE/pizza-margherita.jpeg"
            },
            {
                "id": 3,
                "name": "Veggie Delight",
                "description": "Pizza with mixed vegetables",
                "price": "22.00",
                "is_pizza": true,
                "is_active": true,
                "category": 2,
                "image": "https://img.pikbest.com/wp/202344/tomato-pepper-delectable-veggie-delight-a-flavorful-pizza-topped-with-olives-red-and_9924628.jpg!w700wp"
            },
            {
                "id": 4,
                "name": "Cola",
                "description": "Refreshing beverage",
                "price": "5.00",
                "is_pizza": false,
                "is_active": true,
                "category": 3,
                "image": "https://media.istockphoto.com/id/487787108/pl/zdj%C4%99cie/czy-coca-coli-na-lodzie.jpg?s=612x612&w=0&k=20&c=l0pWyHA_owEd0prwQpoECIDH5k-IU4OVxWBh6b_n5JE="
            }
        ];

        const activeItems = menuData.filter(item => item.is_active);
        setMenuItems(activeItems);
        setFilteredItems(activeItems);
    }, []);

    useEffect(() => {
        const categoryData = [
            {
                "id": 2,
                "name": "Vege",
                "description": ""
            },
            {
                "id": 3,
                "name": "Classic",
                "description": ""
            }
        ];
        setCategories(categoryData);
    }, []);

    useEffect(() => {
        const sizes = [
            { "id": 1, "name": "Standart", "diameter": "25.00", "base_price": "0.00" },
            { "id": 2, "name": "XL", "diameter": "30.00", "base_price": "10.00" },
            { "id": 3, "name": "XXL", "diameter": "35.00", "base_price": "20.00" }
        ];
        setPizzaSizes(sizes);

        const crusts = [
            { "id": 1, "name": "Thin", "price": "3.00" },
            { "id": 2, "name": "Big fat", "price": "5.00" }
        ];
        setCrustTypes(crusts);

        const sauceData = [
            { "id": 1, "name": "Pomidoro", "price": "5.00" },
            { "id": 2, "name": "Garlic", "price": "5.00" }
        ];
        setSauces(sauceData);

        const cheeseData = [
            { "id": 1, "name": "Mozarella", "price": "5.00" }
        ];
        setCheeses(cheeseData);

        const toppingData = [
            { "id": 1, "name": "Pepperoni", "price": "5.00", "is_active": true },
            { "id": 2, "name": "Mozarella", "price": "4.00", "is_active": true },
            { "id": 3, "name": "Paprika", "price": "4.00", "is_active": true }
        ];
        setToppings(toppingData.filter(t => t.is_active));
    }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (selectedCategory === '') {
            setFilteredItems(menuItems);
        } else {
            const categoryId = parseInt(selectedCategory, 10);
            const items = menuItems.filter(item => item.category === categoryId);
            setFilteredItems(items);
        }
    }, [selectedCategory, menuItems]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleAddToCartButton = (item) => {
        if (item.is_pizza) {
            setCurrentPizza(item);
            setSelectedSize(pizzaSizes[0]?.id.toString() || '');
            setSelectedCrust(crustTypes[0]?.id.toString() || '');
            setSelectedSauce(sauces[0]?.id.toString() || '');
            setSelectedCheese(cheeses[0]?.id.toString() || '');
            setSelectedToppings([]);
            setShowModal(true);
        } else {
            // For non-pizza items, just set customization to null
            addItemToCart(parseFloat(item.price), { ...item, customization: null });
        }
    };

    const addItemToCart = (finalPrice, item) => {
        const itemCustomization = item.customization ? JSON.stringify(item.customization) : '';
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(ci => {
                const ciCustomization = ci.customization ? JSON.stringify(ci.customization) : '';
                return ci.id === item.id && ciCustomization === itemCustomization;
            });

            if (existingItemIndex > -1) {
                // Item with same customization found, increment quantity
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += 1;
                return updatedCart;
            } else {
                // Add new item with quantity 1
                return [...prevCart, { ...item, quantity: 1, price: finalPrice.toFixed(2) }];
            }
        });
    };

    const handleIncrementItem = (cartItem) => {
        const itemCustomization = cartItem.customization ? JSON.stringify(cartItem.customization) : '';
        setCart(prevCart => {
            return prevCart.map(ci => {
                const ciCustomization = ci.customization ? JSON.stringify(ci.customization) : '';
                if (ci.id === cartItem.id && ciCustomization === itemCustomization) {
                    return { ...ci, quantity: ci.quantity + 1 };
                }
                return ci;
            });
        });
    };

    const handleDecrementItem = (cartItem) => {
        const itemCustomization = cartItem.customization ? JSON.stringify(cartItem.customization) : '';
        setCart(prevCart => {
            return prevCart
                .map(ci => {
                    const ciCustomization = ci.customization ? JSON.stringify(ci.customization) : '';
                    if (ci.id === cartItem.id && ciCustomization === itemCustomization) {
                        const updatedQuantity = ci.quantity - 1;
                        if (updatedQuantity > 0) {
                            return { ...ci, quantity: updatedQuantity };
                        } else {
                            // quantity would be 0, so remove this item by returning null
                            return null;
                        }
                    }
                    return ci;
                })
                .filter(ci => ci !== null); // Filter out nulls to remove items with 0 quantity
        });
    };

    const handleRemoveItem = (cartItem) => {
        const itemCustomization = cartItem.customization ? JSON.stringify(cartItem.customization) : '';
        setCart(prevCart => {
            return prevCart.filter(ci => {
                const ciCustomization = ci.customization ? JSON.stringify(ci.customization) : '';
                return !(ci.id === cartItem.id && ciCustomization === itemCustomization);
            });
        });
    };

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

    const applyCoupon = (e) => {
        e.preventDefault();
        setCouponError('');

        fetch('http://localhost:8000/api/v1/coupons/apply/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: couponCode })
        })
            .then(res => res.json())
            .then(data => {
                if (data.discount_value && data.discount_type) {
                    setDiscountValue(data.discount_value);
                    setDiscountType(data.discount_type);
                    setCouponError('');
                } else if (data.code) {
                    setCouponError(data.code[0]);
                    setDiscountValue(null);
                    setDiscountType(null);
                }
            })
            .catch(error => {
                console.error('Error applying coupon:', error);
                setCouponError('An unexpected error occurred. Please try again.');
            });
    };

    const originalTotal = calculateTotal();
    const discountedTotal = calculateDiscountedTotal();

    const handlePizzaConfirm = () => {
        if (!currentPizza) return;
        let finalPrice = parseFloat(currentPizza.price);

        const chosenSize = pizzaSizes.find(s => s.id === parseInt(selectedSize, 10));
        if (chosenSize) {
            finalPrice += parseFloat(chosenSize.base_price);
        }

        const chosenCrust = crustTypes.find(c => c.id === parseInt(selectedCrust, 10));
        if (chosenCrust) {
            finalPrice += parseFloat(chosenCrust.price);
        }

        const chosenSauce = sauces.find(s => s.id === parseInt(selectedSauce, 10));
        if (chosenSauce) {
            finalPrice += parseFloat(chosenSauce.price);
        }

        const chosenCh = cheeses.find(ch => ch.id === parseInt(selectedCheese, 10));
        if (chosenCh) {
            finalPrice += parseFloat(chosenCh.price);
        }

        selectedToppings.forEach(tId => {
            const toppingObj = toppings.find(t => t.id === parseInt(tId, 10));
            if (toppingObj) {
                finalPrice += parseFloat(toppingObj.price);
            }
        });

        const itemToAdd = {
            ...currentPizza,
            customization: {
                size: chosenSize?.name,
                crust: chosenCrust?.name,
                sauce: chosenSauce?.name,
                cheese: chosenCh?.name,
                toppings: toppings.filter(t => selectedToppings.includes(t.id.toString())).map(t => t.name)
            }
        };
        addItemToCart(finalPrice, itemToAdd);
        setShowModal(false);
    };

    return (
        <Container className="mt-4">
            <Row>
                {/* Left column for menu items */}
                <Col md={9}>
                    <h2>Menu</h2>

                    <Form className="mb-3">
                        <Form.Group controlId="categorySelect">
                            <Form.Label>Select Category</Form.Label>
                            <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="">All</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>

                    <Row className="mt-3">
                        {filteredItems.length === 0 ? (
                            <Col>
                                <p>No items found for this category.</p>
                            </Col>
                        ) : (
                            filteredItems.map(item => (
                                <Col md={6} className="mb-4" key={item.id}>
                                    <Card>
                                        {item.image ? (
                                            <Card.Img variant="top" src={item.image} alt={item.name} />
                                        ) : (
                                            <Card.Img
                                                variant="top"
                                                src="https://via.placeholder.com/300x200?text=No+Pizza+Image"
                                                alt="No Image Available"
                                            />
                                        )}
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>{item.description}</Card.Text>
                                            <Card.Text><strong>Price: </strong>${item.price}</Card.Text>
                                            {/*{item.is_pizza && <Card.Text><em>Pizza</em></Card.Text>}*/}
                                            <Button variant="success" onClick={() => handleAddToCartButton(item)}>+</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                </Col>

                {/* Right column for cart */}
                <Col md={3}>
                    <h3>Cart</h3>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <ListGroup className="mb-3">
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
                                                <Col xs={6} className="text-end">
                                                    <Button
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        onClick={() => handleDecrementItem(cartItem)}
                                                        style={{ marginRight: '5px' }}
                                                    >
                                                        -
                                                    </Button>
                                                    <Button
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        onClick={() => handleIncrementItem(cartItem)}
                                                        style={{ marginRight: '5px' }}
                                                    >
                                                        +
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleRemoveItem(cartItem)}
                                                    >
                                                        X
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>

                            <Form onSubmit={applyCoupon} className="mb-3">
                                <Form.Label>Coupon Code</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <Button type="submit" variant="primary">Apply</Button>
                                </InputGroup>
                            </Form>
                            {couponError && <Alert variant="danger">{couponError}</Alert>}

                            <ListGroup>
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
                            {/*on click button to /checkout endpoint*/}
                            <Button variant="primary" className="w-100 mt-3" onClick={()=>window.location.href="/checkout"}>Checkout</Button>
                        </>
                    )}
                </Col>
            </Row>

            {/* Modal for Pizza Customization */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Customize Your Pizza</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentPizza && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Size</Form.Label>
                                <Form.Select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                                    {pizzaSizes.map(size => (
                                        <option key={size.id} value={size.id}>{size.name} (+${size.base_price})</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Crust</Form.Label>
                                <Form.Select value={selectedCrust} onChange={(e) => setSelectedCrust(e.target.value)}>
                                    {crustTypes.map(crust => (
                                        <option key={crust.id} value={crust.id}>{crust.name} (+${crust.price})</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Sauce</Form.Label>
                                <Form.Select value={selectedSauce} onChange={(e) => setSelectedSauce(e.target.value)}>
                                    {sauces.map(sauce => (
                                        <option key={sauce.id} value={sauce.id}>{sauce.name} (+${sauce.price})</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Cheese</Form.Label>
                                <Form.Select value={selectedCheese} onChange={(e) => setSelectedCheese(e.target.value)}>
                                    {cheeses.map(ch => (
                                        <option key={ch.id} value={ch.id}>{ch.name} (+${ch.price})</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Toppings</Form.Label>
                                {toppings.map(top => (
                                    <Form.Check
                                        key={top.id}
                                        type="checkbox"
                                        label={`${top.name} (+$${top.price})`}
                                        checked={selectedToppings.includes(top.id.toString())}
                                        onChange={(e) => {
                                            const value = top.id.toString();
                                            if (e.target.checked) {
                                                setSelectedToppings(prev => [...prev, value]);
                                            } else {
                                                setSelectedToppings(prev => prev.filter(t => t !== value));
                                            }
                                        }}
                                    />
                                ))}
                            </Form.Group>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handlePizzaConfirm}>Add to Cart</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default MenuPage;
