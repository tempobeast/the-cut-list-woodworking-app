import React from "react";
import {useNavigate} from "react-router-dom"
import '../App.css';

function Footer() {

    const navigate = useNavigate()
   
    return (
            <div className="footer">
                <p onClick={() => navigate("/")} >Home</p>
                <p onClick={() => navigate("/available_projects")} >Available Projects</p>
            </div>
    )
}

export default Footer