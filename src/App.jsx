import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {Route, Routes} from "react-router-dom";
import Auth from "./components/Auth.jsx";
import Register from "./components/Register.jsx";
import {useState} from "react";
import Main from "./components/Main.jsx";
import UserMain from "./components/UserMain.jsx";
import ShowClassified from "./components/ShowClassified.jsx";
import CreateClassified from "./components/CreateClassified.jsx";
import EditClassified from "./components/EditClassified.jsx";

export default function App() {
    const API_URL = 'http://127.0.0.1:8000/api';
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    return (
        <div className="container">
            <Header API_URL={API_URL} token={token} setToken={setToken}/>

            <main className="mb-5">
                <Routes>
                    <Route path="/register" element={<Register API_URL={API_URL} token={token}/>}/>
                    <Route path="/auth" element={<Auth API_URL={API_URL} token={token} setToken={setToken}/>}/>

                    <Route path="/" element={<Main API_URL={API_URL}/>}/>
                    <Route path="/classifieds/:id" element={<ShowClassified API_URL={API_URL}/>}/>
                    <Route path="/classifieds/create" element={<CreateClassified API_URL={API_URL} token={token}/>}/>
                    <Route path="/classifieds/:id/edit" element={<EditClassified API_URL={API_URL} token={token}/>}/>

                    <Route path="/user/classifieds" element={<UserMain API_URL={API_URL} token={token}/>}/>
                </Routes>
            </main>

            <Footer API_URL={API_URL} token={token} setToken={setToken}/>
        </div>
    )
}