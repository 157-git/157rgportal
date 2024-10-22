import React, { useState } from "react";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"; // For plus and minus icons
import { FaMapMarkerAlt, FaPhoneAlt, FaRegFileAlt } from "react-icons/fa"; // For location, phone, and file icons
import { HiCurrencyRupee } from "react-icons/hi"; // For currency icon
import { CiTimer } from "react-icons/ci"; // For timer icon (notice period)
import { GrUserExpert } from "react-icons/gr"; // For experience icon
import { BsEnvelopeAtFill } from "react-icons/bs"; // For email icon
import { IoIosSchool } from "react-icons/io"; //Form qualification icon
import "./ApplicantJobCard.css";
import { Button, Modal } from "react-bootstrap";


const ApplicantJobCard = ({openResume, candidate, isExpanded, onToggle}) => {
  
  const formattedExperience = `${candidate.experienceYear} years - ${candidate.experienceMonth} months`;
  
  const [showResume, setShowResume] = useState(false);
  
  const [selectedCandidateResume, setSelectedCandidateResume]=useState(null);

  //This is added by vaibhavi kawarkhe Date:21-10-2024
  // Function to convert byte code to a document link
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


  // Function to download the resume
  const downloadResume = (byteCode) => 
    {
  const downloadLink = convertToDocumentLink(byteCode, "Resume.pdf");
  if (downloadLink && downloadLink !== "Unsupported Document" && downloadLink !== "Document Not Found")
     {
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = "Resume.pdf"; // Set the name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    } 
  else 
  {
    alert("Resume not available for download");
  }
   };

  return (
    <div className="applicantjobcard">
    <div className="card-content">
      
      <div className="top-section">
      <img src="https://cdn.pixabay.com/photo/2023/11/28/21/35/ural-owl-8418249_1280.jpg" height="180px" width="150px" alt="" />
      
      <div className="info-section">
        <h2>{candidate.candidateName}</h2>
        <p><IoIosSchool style={{marginRight:'5px'}}/><strong>Job Designation:</strong> {candidate.jobDesignation}</p>
        <p><GrUserExpert style={{ marginRight: '5px' }} /><strong>Experience:</strong> {formattedExperience}</p>
        <p><FaPhoneAlt style={{ marginRight: '5px' }} /><strong>Contact:</strong> {candidate.contactNumber}</p>
        <p><BsEnvelopeAtFill style={{ marginRight: '5px' }} /><strong>Email:</strong> {candidate.candidateEmail}</p>
      </div>
      </div>

    {/* Fields below the image */}
    <div className="bottom-section">
      <p><IoIosSchool style={{ marginRight: '5px' }} /><strong>Qualification:</strong> {candidate.qualification}</p>
      <p><FaRegFileAlt style={{ marginRight: '5px' }} /><strong>Skills:</strong> {candidate.skills ? candidate.skills : "N/A"}</p>
      <p><FaMapMarkerAlt style={{ marginRight: '5px' }} /><strong>Location:</strong> {candidate.currentLocation}</p>
      <p><HiCurrencyRupee style={{ marginRight: '5px' }} /><strong>Current CTC:</strong> ₹{candidate.currentCTCLakh} Lakh {candidate.currentCTCThousand} Thousand</p>
      <p><CiTimer style={{ marginRight: '5px' }} /><strong>Notice Period:</strong> {candidate.noticePeriod ? candidate.noticePeriod : "N/A"} days</p>
     
    
     </div>
  
      {/*This is added by vaibhavi kawarkhe */}
       <div className="buttons-section">
          {/* View and View Resume buttons */}
          
          <button className="view-more-btn" onClick={onToggle}>
            {isExpanded ? (
              <>
                <AiOutlineMinus style={{ marginRight: "5px" }} />
                Back
              </>
            ) : (
              <>
                <AiOutlinePlus style={{ marginRight: "5px" }} />
                View more
              </>
            )}
          </button>
          

          {/*button for resume download*/} 
          <button className="view-resume-btn" onClick={() => downloadResume(candidate.resume)}>
            <FaRegFileAlt style={{ marginRight: "5px" }} />
            Download Resume
          </button>

          <button className="resume-button" onClick={() => openResume(candidate.resume)}>
              View Resume
          </button>
          
        </div>
      </div>

      {isExpanded && (
        <div className="expanded-details">
          <p><strong>Feedback:</strong> {candidate.callingFeedback}</p>
          <p><strong>Status:</strong> {candidate.candidateStatus}</p>
          <p><strong>Company Name:</strong> {candidate.requirementCompany}</p>
          <p><strong>Source:</strong> {candidate.sourceName}</p>
          <p><strong>Holding Any Offer:</strong> {candidate.holdingAnyOffer}</p>
          <p><strong>Final Status:</strong> {candidate.finalStatus}</p>
          <p><strong>Date Of Birth:</strong> {candidate.dateOfBirth}</p>
          <p><strong>Expected joining Date:</strong> {candidate.availabilityForInterview}</p>
          {/* <p><strong>Resume</strong> {candidate.resume}</p> */}
          <p>
            <strong>Expected CTC:</strong> {candidate.expectedCTCLakh}Lakh {candidate.expectedCTCThousand} Thousand
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicantJobCard;