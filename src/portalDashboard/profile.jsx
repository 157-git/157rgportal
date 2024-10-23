//This is added by vaibhavi kawarkhe Date: 23-10-2024

import React, { useRef,useState } from 'react';
import './profile.css';
import profileIcon from '../photos/profilepic.jpg';
const Profile = () => {
    const userInfo = {
        name: "Vaibhavi Kawarkhe",
        email: "vaibhavi@example.com",
        phone: "123-456-7890",
        location: "New York, USA",
        designation: "Full Stack Java Developer",
    };

    // Create refs for each section
    const profileSummaryRef = useRef(null);
    const resumeTitleRef = useRef(null);
    const locationRef = useRef(null);
    const educationalDetailsRef = useRef(null);
    const personalDetailsRef = useRef(null);
    const employmentDetailsRef = useRef(null);
    const resumeRef = useRef(null);
    const preferencesRef = useRef(null);
    const certificatesRef = useRef(null);
    const otherDetailsRef = useRef(null);

    const [resumeFile, setResumeFile] = useState(null); // State to store the uploaded resume file name
    
    // Function to handle file upload
    const handleFileUpload = (e) => {
      const file = e.target.files[0]; // Get the uploaded file
      if (file) {
          setResumeFile(file.name); // Update the resume file name state
      }
  };


    // Function to scroll to the respective section
    const scrollToSection = (ref) => 
    {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='main-profile-container'>
            <div className='profile-block-section'>
            <div className='profile-header-block'>
                {/* First sub-div for profile icon, name, and designation */}
                <div className="profile-header-left">
                   <div className="profile-icon2">
                     <img src={profileIcon} alt="Profile" className="profile-img2" />
                   </div>
                   <div className="profile-info">
                     <h2>{userInfo.name}</h2>
                     <h4>Designation: {userInfo.designation}</h4>
                   </div>
                 </div>

                {/* Second sub-div for email and phone number */}
                <div className="profile-header-right">
                  <p>Email: {userInfo.email}</p>
                  <p>Phone: {userInfo.phone}</p>
                </div>
              </div>
                <div className='profile-info-block'>
                    <div className='profile-info-content'>
                     {/* Profile completion meter*/}
                     <div className="profile-meter">
                         <div className="profile-meter-bar" style={{ width: '46%' }}></div>
                     </div> 
                    

                      {/* Sub Div 2: Resume Upload */}
                     <div className="resume-upload">
                        <h4>Upload Resume</h4>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                        />
                       {/*{resumeFile && <p>Uploaded Resume: {resumeFile}</p>}*/} {/* Show uploaded file name */}
                      </div>
                    </div>
                    <p>Profile Completion: 66%</p>
                </div>
            </div>

            <div className='profile-flex-section'>
                <div className='flex-item1'>
                    <ul>
                        <li><a href="#" onClick={() => scrollToSection(profileSummaryRef)}>Profile Summary</a></li>
                        <li><a href="#" onClick={() => scrollToSection(resumeTitleRef)}>Resume Title & Keyskills</a></li>
                        <li><a href="#" onClick={() => scrollToSection(locationRef)}>Location</a></li>
                        <li><a href="#" onClick={() => scrollToSection(educationalDetailsRef)}>Educational Details</a></li>
                        <li><a href="#" onClick={() => scrollToSection(personalDetailsRef)}>Personal Details</a></li>
                        <li><a href="#" onClick={() => scrollToSection(employmentDetailsRef)}>Employment Details</a></li>
                        <li><a href="#" onClick={() => scrollToSection(resumeRef)}>Resume</a></li>
                        <li><a href="#" onClick={() => scrollToSection(preferencesRef)}>Preferences</a></li>
                        <li><a href="#" onClick={() => scrollToSection(certificatesRef)}>Certificates</a></li>
                        <li><a href="#" onClick={() => scrollToSection(otherDetailsRef)}>Other Details</a></li>
                    </ul>
                </div>

                <div className='flex-item2'>
                    <div ref={profileSummaryRef} className='content-section'>
                        Profile Summary Content
                    </div>
                    <div ref={resumeTitleRef} className='content-section'>
                        Resume Title & Keyskills
                    </div>
                    <div ref={locationRef} className='content-section'>
                        Location
                    </div>
                    <div ref={educationalDetailsRef} className='content-section'>
                        Educational Details
                    </div>
                    <div ref={personalDetailsRef} className='content-section'>
                        Personal Details
                    </div>
                    <div ref={employmentDetailsRef} className='content-section'>
                        Employment Details
                    </div>
                    <div ref={resumeRef} className='content-section'>
                        Resume
                    </div>
                    <div ref={preferencesRef} className='content-section'>
                        Preferences
                    </div>
                    <div ref={certificatesRef} className='content-section'>
                        Certificates
                    </div>
                    <div ref={otherDetailsRef} className='content-section'>
                        Other Details
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
