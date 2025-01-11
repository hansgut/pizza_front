import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MyNavbar from "./components/MyNavbar.jsx";
import Container from "react-bootstrap/Container";
import Register from "./pages/Register.jsx";
import Menu from "./pages/Menu.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Checkout from "./pages/Checkout.jsx";

function App() {
    return (
    <>
        <MyNavbar />
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="*" element={<h1>Not Found</h1>} />

                </Routes>
            </BrowserRouter>
        </Container>
    </>
    )
}

export default App
