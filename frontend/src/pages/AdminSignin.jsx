import React from 'react';
import AuthForm from '../components/AuthForm';

const AdminSignin = () => {
    return (
        <div>
            <AuthForm admin='true' />
        </div>
    );
}

export default AdminSignin;
