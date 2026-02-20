import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { signin } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [response, setResponse] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            const res = await signin(formData);
            console.log(res.data);
            setResponse(res.data.message);
            
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("role", res.data.role);

            if (res.data.role === "victim") {
                navigate('/victim/dashboard');
            }
            else if (res.data.role === "donor") {
                navigate('/donor/dashboard');
            }

            return true;
        }

        catch (e) {
            if (e.response) {
                if (e.response.status === 401) {
                    setResponse("Invalid Password Entered ");
                }
                else if (e.response.status === 404) {
                    setResponse("No user with this email.")
                }
                else if (e.response.status === 500) {
                    setResponse("Server error. Please try again later.");
                }
            }
            else {
                setResponse("Network error. Check your connection.");
            }
        }
    }

    return (
        <div>
            <AuthForm onSubmit={handleSubmit} response={response} />
        </div>
    )
};


export default Signin;
