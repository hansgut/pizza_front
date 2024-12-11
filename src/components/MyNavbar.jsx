import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNavbar() {
  return (
    <>
        <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Real pizza</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/menu">Menu</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">
                            <b>Login</b>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  );
}

export default MyNavbar;