import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";

function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    </>
    )
}

export default App
