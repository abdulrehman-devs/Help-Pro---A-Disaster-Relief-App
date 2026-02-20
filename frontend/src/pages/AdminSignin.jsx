import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { adminSignin } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AdminSignin = () => {
    const [response, setResponse] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            const res = await adminSignin(formData);
            console.log(res.data.message);
            setResponse(res.data.message);
            localStorage.setItem("adminToken", res.data.adminToken)
            navigate("/admin-dashboard");
            
        }
        catch (e) {
            console.log("Internal server error", e);
        }
    } 
    
    return (
        <div>
            <AuthForm admin='true' onSubmit={handleSubmit} response={response}/>
        </div>
    );
}

export default AdminSignin;
