import React from 'react';
import Header from '../components/Header.jsx';

const UserDashboard = () => {
    return (
        <>
            <Header isLoggedIn={true} />

            <main>
                <div className='user-dash'>

                </div>
            </main>

        </>
    );
}

export default UserDashboard;
