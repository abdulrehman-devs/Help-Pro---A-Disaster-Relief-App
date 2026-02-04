import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { signup } from '../services/authService';

const Signup = () => {
    const [response, setResponse] = useState("");

    const handleSubmit = async (formData) => {
        try {
            const res = await signup(formData);
            console.log(res);
            setResponse(res.data.message);
            return true;
        }
        catch (e) {
            if (e.response) {
                if (e.response.status === 409) {
                    setResponse("Email Already Registered. ");
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
            <AuthForm onSubmit={handleSubmit} response={response}/>
        </div>
    );
}

export default Signup;
