import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"; // For plus and minus icons
import { FaMapMarkerAlt, FaPhoneAlt, FaRegFileAlt } from "react-icons/fa"; // For location, phone, and file icons
import { HiCurrencyRupee } from "react-icons/hi"; // For currency icon
import { CiTimer } from "react-icons/ci"; // For timer icon (notice period)
import { GrUserExpert } from "react-icons/gr"; // For experience icon
import { BsEnvelopeAtFill } from "react-icons/bs"; // For email icon
import { IoIosSchool } from "react-icons/io"; //Form qualification icon
import "./ApplicantJobCard.css";

const ApplicantJobCard = ({ candidate, isExpanded, onToggle,onDownloadResume,onViewResume}) => {
  const formattedExperience = `${candidate.experienceYear} years - ${candidate.experienceMonth} months`;

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
          <button className="view-resume-btn" onClick={onDownloadResume}>
            <FaRegFileAlt style={{ marginRight: "5px" }} />
            Download Resume
          </button>
          <button className="resume-button" onClick={onViewResume}>
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
          <p><strong>Resume</strong> {candidate.resume}</p>
          <p>
            <strong>Expected CTC:</strong> {candidate.expectedCTCLakh}Lakh {candidate.expectedCTCThousand} Thousand
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicantJobCard;