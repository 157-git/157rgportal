// import React from 'react';
import profileIcon from '../photos/profilepic.jpg';
import './profile.css';

const Profile = () => {
  const userInfo = {
    name: "Vaibhavi Kawarkhe",
    email: "vaibhavi@example.com",
    phone: "123-456-7890",
    // Add more user information as needed
  };

  return (
    <div className="profile-page">
      {/* Header Section */}
      <div className="profile-header">
        <h2>User Profile</h2>
        <div className="user-info">
          <img src={profileIcon} alt="Profile" className="profile-picture" />
          <div>
            <h3>{userInfo.name}</h3>
            <p>Email: {userInfo.email}</p>
            <p>Phone: {userInfo.phone}</p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="profile-content">
        {/* Sidebar Navigation */}
        <div className="profile-sidebar">
          <ul className="profile-options">
            <li><a href="#" >View Profile</a></li>
            <li><a href="#" >Edit Profile</a></li>
            <li><a href="#" >Account Settings</a></li>
            <li><a href="#" >Change Password</a></li>
            <li><a href="#">Help & Support</a></li>
            <li><a href="#" >Logout</a></li>
            <li><a href="#" >Delete Profile</a></li>
          </ul>
        </div>

        {/* Main Information Section */}
        <div className="profile-details">
          {/* Add user details or other relevant information here */}
          <h4>Profile Details</h4>
          <p>Here you can add more detailed information about the user.</p>
          {/* For example, user experience, education, skills, etc. */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
