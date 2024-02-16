import React from 'react';
import axios from 'axios';

const handleLogout = async () => {
    try {
        const token = localStorage.getItem('token');

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${token}`
        //     }
        // };

        // Logout request to the server
        const response = await axios.post('http://localhost:5000/api/adminlogout',  {token:token});

        if (response.data.sts === 0) {
            // Clear local storage upon successful logout
            localStorage.removeItem('token');
            localStorage.removeItem('adminname');
            localStorage.removeItem('adminid');
            // Redirect the user to the login page
            window.location.href = '/adminlogin';
        } else {
            console.error('Logout failed:', response.data.message);
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
};

const AdminLogout = () => {
    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default AdminLogout;
