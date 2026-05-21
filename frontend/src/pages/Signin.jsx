import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { signin } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        setResponse("");
        setLoading(true);

        try {
            const res = await signin(formData);
            setResponse(res.data.message);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            if (res.data.role === "victim") {
                navigate("/victim/dashboard");
            } else if (res.data.role === "donor") {
                navigate("/donor/dashboard");
            } else {
                setResponse("Unknown account role. Contact support.");
                return false;
            }

            return true;
        } catch (e) {
            if (e.code === "ECONNABORTED") {
                setResponse(
                    "Server took too long to respond. Check that the backend and database are running."
                );
            } else if (e.response) {
                const status = e.response.status;
                const serverMessage = e.response.data?.message;

                if (status === 401) {
                    setResponse("Invalid password.");
                } else if (status === 404) {
                    setResponse("No user with this email.");
                } else if (status === 500) {
                    setResponse("Server error. Please try again later.");
                } else {
                    setResponse(serverMessage || "Sign in failed. Please try again.");
                }
            } else {
                setResponse(
                    "Cannot reach the server. Is the backend running on port 5000?"
                );
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <AuthForm onSubmit={handleSubmit} response={response} loading={loading} />
        </div>
    )
};


export default Signin;
