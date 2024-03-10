import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Home()
{
    // const [isAuthenticated,setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));
    const navigate = useNavigate();
    const handleLogoutClick=() => {
        localStorage.clear();
        localStorage.setItem("isAuthenticated","false");
        navigate('/login');
    };
    return(
        <div>
            <h1>Home</h1>
            <button type="button" onClick={handleLogoutClick}>Logout</button>
        </div>
    )
}