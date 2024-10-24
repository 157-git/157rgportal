//This is added by vaibhavi kawarkhe

import React, { useEffect, useState } from "react";
import ApplicantJobCard from "./ApplicantJobCard"; //Import the ApplicantJobCard component
import "./header";
import "./recruiter.css";
import AddJobDescription from "./AddJobDescription"; // Import the AddJobDescription component
import Candidate from "./Candidate"; // Import Candidate component

const Recruiter = ({selectedRole}) => 
{
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const [locationFilter, setLocationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [jobDesignationFilter, setJobDesignationFilter] = useState("");
  const [qualificationFilter, setQualificationFilter] = useState(""); 
  const [companyFilter, setCompanyFilter] = useState("");
  const [keywordFilter, setKeywordFilter] = useState("");
  const [filterCount, setFilterCount] = useState(0);

  const [isAddJobDescriptionVisible, setIsAddJobDescriptionVisible] = useState(false); // State to manage Add JD visibility
  const [showCandidateComponent, setShowCandidateComponent] = useState(false); // New state to toggle between views

  const [showResume, setShowResume] = useState(false);
  
  const [selectedCandidateResume, setSelectedCandidateResume]=useState(null);

  

  useEffect(() => 
  {
    fetch("http://93.127.199.85/api/ats/157industries/calling-lineup/871/Manager")
      .then((response) => response.json())
      .then((data) => {
        setCandidates(data);
        setFilteredCandidates(data);
        setFilterCount(data.length);
      });
  }, []);

  const handleToggle = (id) => 
  {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  //   This is added by vaibhavi kawarkhe 

  
  const handleFilterChange = () => 
  {
    let filtered = candidates;

    if (keywordFilter) 
    {
      const keywordLower = keywordFilter.toLowerCase();
      filtered = filtered.filter((candidate) => (
        candidate.skills?.toLowerCase().includes(keywordLower) ||
        candidate.jobDesignation.toLowerCase().includes(keywordLower) ||
        candidate.qualification.toLowerCase().includes(keywordLower) ||
        candidate.currentLocation.toLowerCase().includes(keywordLower) ||
        candidate.requirementCompany.toLowerCase().includes(keywordLower) ||
        candidate.callingFeedback.toLowerCase().includes(keywordLower)||
        candidate.noticePeriod?.toString().includes(keywordLower) ||   
        candidate.experienceYear?.toString().includes(keywordLower) ||   
        candidate.currentCTCLakh?.toString().includes(keywordLower)
      ));
    }

    if (locationFilter) {
      filtered = filtered.filter((candidate) =>
        candidate.currentLocation.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (experienceFilter) {
      filtered = filtered.filter((candidate) => candidate.experienceYear >= parseInt(experienceFilter));
    }

    if (salaryFilter) {
      filtered = filtered.filter((candidate) => candidate.currentCTCLakh >= parseInt(salaryFilter));
    }

    if (jobDesignationFilter) {
      filtered = filtered.filter((candidate) =>
        candidate.jobDesignation.toLowerCase().includes(jobDesignationFilter.toLowerCase())
      );
    }

    if (qualificationFilter) {
      filtered = filtered.filter((candidate) =>
        candidate.qualification.toLowerCase().includes(qualificationFilter.toLowerCase())
      );
    }

    if (companyFilter) {
      filtered = filtered.filter((candidate) =>
        candidate.requirementCompany.toLowerCase().includes(companyFilter.toLowerCase())
      );
    }

    setFilteredCandidates(filtered);
    setFilterCount(filtered.length);
  };

  // Apply the filters immediately when any filter option changes
  useEffect(() => {
    handleFilterChange();
  }, [locationFilter, experienceFilter, salaryFilter, jobDesignationFilter, qualificationFilter, companyFilter, keywordFilter]);

   // Handler for ViewJD button
   const handleViewJD = () => {
    setShowCandidateComponent(true); // Set to true to display Candidate component
  };

  const handleAddJDClick = () => {
    setIsAddJobDescriptionVisible(true); // Show Add JD component
  };

  const handleCloseAddJD = () => {
    setIsAddJobDescriptionVisible(false); // Hide Add JD component
  };
   // Function to open the resume modal
   const openResume = (byteCode) => 
    {
      setSelectedCandidateResume(byteCode);
      setShowResume(true);
    };
  
    // Function to close the resume modal
    const closeResume = () =>
    {
      setSelectedCandidateResume(null);
      setShowResume(false);
    };
  const convertToDocumentLink = (byteCode, fileName) => {
    if (byteCode) {
      try {
        const fileType = fileName.split(".").pop().toLowerCase();
        const binary = atob(byteCode);
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          array[i] = binary.charCodeAt(i);
        }
        let blob;
        if (fileType === "pdf") {
          blob = new Blob([array], { type: "application/pdf" });
        } else if (fileType === "docx") {
          blob = new Blob([array], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
        } else {
          return "Unsupported Document";
        }
        return URL.createObjectURL(blob);
      } catch (error) {
        console.error("Error converting byte code to document:", error);
        return "Invalid Document";
      }
    }
    return "Document Not Found";
  };

  return (
    <div className="App">
      <div className="sidebar">
      <input
        className="searchKey"
        type="text"
        placeholder="Search by keyword..."
        value={keywordFilter}
        onChange={(e) => setKeywordFilter(e.target.value)}
      />
      
        <div className="filters">
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">All Locations</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune City">Pune City</option>
          </select>

          <select value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)}>
            <option value="">All Experience Levels</option>
            <option value="1">1+ Years</option>
            <option value="2">2+ Years</option>
            <option value="5">5+ Years</option>
          </select>

          <select value={salaryFilter} onChange={(e) => setSalaryFilter(e.target.value)}>
            <option value="">All Salary Ranges</option>
            <option value="5">5 Lakh+</option>
            <option value="10">10 Lakh+</option>
            <option value="15">15 Lakh+</option>
          </select>

          <select value={jobDesignationFilter} onChange={(e) => setJobDesignationFilter(e.target.value)}>
            <option value="">All Job Designation</option>
            <option value="Java Full Stack Developer">Java Full Stack Developer</option>
            <option value="MainFrame Developer">MainFrame Developer</option>
            <option value="Scrum Master">Scrum Master</option>
          </select>

          <select value={qualificationFilter} onChange={(e) => setQualificationFilter(e.target.value)}>
            <option value="">All Qualifications</option>
            <option value="Bachelor Of Technology">Bachelor Of Technology</option>
            <option value="Bachelor Of Business Administration">Bachelor of Business Administration</option>
            <option value="MBA">MBA</option>
          </select>

          <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
            <option value="">All Companies</option>
            <option value="Infosys">Infosys</option>
            <option value="157 industries pvt ltd">157 industries pvt ltd</option>
            <option value="msys technologies">msys technologies</option>
          </select>
        </div>
      
       {/* AddJD button below the Toggle Filters button */}
       <button className="add-jd-btn" onClick={handleAddJDClick}>
         AddJD
      </button>

      {/* ViewJD button */}
      <button className="view-jd-btn" onClick={handleViewJD}>
         ViewJD
      </button>
      </div>
      
       {/* Conditionally render Candidate component or candidate cards */}
      {showCandidateComponent ? (
        <Candidate selectedRole={selectedRole} />  
      ) : (
        <div>
          {/* Render the AddJobDescription component if visible */}
          {isAddJobDescriptionVisible ? (
            <AddJobDescription onClose={handleCloseAddJD} />
          ) : (
            <div className="cards-container">
              <div className="filtered-count">
                <p>{filterCount} candidates found...</p>
              </div>
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <ApplicantJobCard
                    key={candidate.candidateId}
                    candidate={candidate}
                    isExpanded={expandedCardId === candidate.candidateId}
                    onToggle={() => handleToggle(candidate.candidateId)}
                    keyword={keywordFilter} // Pass the keyword filter to the card
                    openResume={openResume}
                  />
                ))
              ) : (
                <p>No candidates found...</p>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* This is done by vaibhavi kawarkhe Date: 24-10-2024*/}
     <div className="resume-display-section">
    {showResume && selectedCandidateResume ? (
        <div className="resume-file-div">
            
                <div className="resume-header">
                    <div className="resume-title">
                    <h2>Resume</h2>
                    </div>
                    <div className="close-button">
                    <button onClick={closeResume}>X</button>
                    </div>
                </div>
                <iframe
                    src={convertToDocumentLink(selectedCandidateResume, "Resume.pdf")} // Ensure this function converts to a valid URL for the PDF
                    className="resume-iframe"
                    title="PDF Viewer"
                ></iframe>   
        </div>
    ) : (
        <div className="no-resume-message">
            <p>No resume available</p>
        </div>
    )}
    </div>
    </div>
  );
};
export default Recruiter;
