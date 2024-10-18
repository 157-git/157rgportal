import React, { useState } from 'react';
import profileIcon from '../photos/profilepic.jpg';
import './profile.css';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login status

  const handleLogout = () => {
    setIsLoggedIn(false); // Update login status
    // Logic to clear session and redirect to login page (e.g., clear auth tokens, local storage, etc.)
    alert("You have been logged out.");
  };

  const handleViewProfile = () => {
    // Logic for viewing the profile (e.g., navigate to profile page)
    alert("Navigating to profile page...");
  };

  const handleEditProfile = () => {
    // Logic for editing profile
    alert("Navigating to edit profile page...");
  };

  const handleAccountSettings = () => {
    // Logic for account settings
    alert("Navigating to account settings...");
  };

  const handleChangePassword = () => {
    // Logic for password change
    alert("Navigating to change password page...");
  };
  const handleDeleteProfile = () => {
    // Logic for deleting the profile (e.g., navigate to profile page)
    alert("Deleting the profile...");
  };
  return (
    <div className="profile-container">
      <img src={profileIcon} alt="Profile" className="profile-picture" />
      <h2>Profile</h2>
      <ul className="profile-options">
        <li><a href="#" onClick={handleViewProfile}>View Profile</a></li>
        <li><a href="#" onClick={handleEditProfile}>Edit Profile</a></li>
        <li><a href="#" onClick={handleAccountSettings}>Account Settings</a></li>
        <li><a href="#" onClick={handleChangePassword}>Change Password</a></li>
        <li><a href="#">Help & Support</a></li>
        <li><a href="#" onClick={handleLogout}>Logout</a></li>
        <li><a href="#" onClick={handleDeleteProfile}>Delete Profile</a></li>
      </ul>
    </div>
  );
};

export default Profile;
