import React, { useState } from 'react';
import axios from 'axios';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    const userId = localStorage.getItem("uid");
    const url = `http://localhost:5000/api/changepassword/${userId}`;

    try {
      const response = await axios.post(url, {
        oldpassword: oldPassword,
        newpassword: newPassword
      });

      if (response.status === 200) {
        setMessage(response.data.message); // Password updated successfully message
        // You can perform additional actions here, such as redirecting the user or displaying a success message.
      } else {
        setMessage(response.data.message); // Error message from the server
        // Handle error, display error message to the user, etc.
      }
    } catch (error) {
      console.error('Something went wrong:', error); // Network error or other errors
      // Handle error, display error message to the user, etc.
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <div>
        <label htmlFor="oldPassword">Old Password:</label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword}>Change Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangePassword;
