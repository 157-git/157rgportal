// header.jsx
import React, { useState } from 'react';

import './Header.css'; 
import Recruiter from './recruiter';// Import Recruiter component
import Candidate from './Candidate'; // Import Candidate component
import profileIcon from '../photos/profilepic.jpg';
import Profile from './profile'; // Import Profile component

const Header = () => {
  const [selectedRole, setSelectedRole] = useState(null); // State to hold the selected role
 
  const handleRoleClick = (role) =>
  {
    if (selectedRole === role)
    {
      // If the same role is clicked again, hide it by setting selectedRole to null
      setSelectedRole(null);
    } 
    else 
    {
      setSelectedRole(role); // Otherwise, show the clicked role content
    }
    
  };

  
  return (
    <div>
      <div className="header">
        <h1>Recruiter's Gear Job Portal</h1>
        
        <div className="buttons">
          <button onClick={() => handleRoleClick('recruiter')}>Recruiter</button>
          <button onClick={() => handleRoleClick('candidate')}>Candidate</button>

           {/* Profile Icon */}
          <div className="profile-icon" onClick={() => handleRoleClick('profile')}>
            <img src={profileIcon} alt="Profile" className="profile-img" />
          </div>
        </div>
      </div>
       
       {/* Render content based on selected role */}
      <div className="content">
        {selectedRole === 'recruiter' && <Recruiter selectedRole={selectedRole}  />} {/* Render Recruiter content */}
        {selectedRole === 'candidate' && <Candidate  selectedRole={selectedRole}  />} {/* Render Candidate content */}
        {selectedRole === 'profile' && <Profile />} {/* Render Profile content */}
      </div>
    </div>
  );
};

export default Header;

