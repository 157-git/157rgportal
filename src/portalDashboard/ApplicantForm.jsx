import {
    faBriefcase,
    faCalendarAlt,
    faCertificate,
    faDollarSign,
    faEnvelope,
    faGraduationCap,
    faMapMarkerAlt,
    faPhone,
    faUser
  } from "@fortawesome/free-solid-svg-icons";
  
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { FormControlLabel, Radio, TextField } from "@mui/material";
  import { LocalizationProvider } from "@mui/x-date-pickers";
  import { DatePicker } from "@mui/x-date-pickers";
  import {AdapterDateFns}from "@mui/x-date-pickers/AdapterDateFns";
  import axios from 'axios';
  import React, { useRef, useState } from "react";
  import logo1 from "../assets/logoweb2.png";
  import "./applicantForm.css"; // Ensure this path is correct
    
  const ApplicantForm = () => {
      const dateInputRef = useRef(null);
    
      const handlePlaceholderClick = () => {
        if (dateInputRef.current) {
          dateInputRef.current.focus();
          dateInputRef.current.click();
        }
      };
    
      const [formData, setFormData] = useState({
        date: "",
        candidateName: "",
        contactNumber: "",
        candidateEmail: "",
        jobDesignation: "",
        currentLocation: "",
        recruiterName: "",
        alternateNumber: "",
        sourceName: "",
        requirementId: "",
        requirementCompany: "",
        communicationRating: "",
        fullAddress: "",
        callingFeedback: "",
        selectYesOrNo: "",
        incentive: null,
        oldEmployeeId: null,
        distance: null,
        lineUp: {
          experienceYear: "",
          relevantExperience: "",
          currentCTCLakh: "",
          expectedCTCLakh: "",
          qualification: "",
          preferredLocation: "",
          noticePeriod: "",
          gender: "",
          availabilityForInterview: "",
          sslCertificates: "",
          relocateStatus: "",
          holdingAnyOffer: "",
          expectedJoinDate: null,
          resume: "",
          photo: "",
          offerdetails: "",
          companyName: "",
          offersalary: "",
          experienceMonth: "",
          dateOfBirth: "",
          extraCertification: "",
          feedBack: "",
          maritalStatus: "",
          pickUpAndDrop: "",
          interviewTime: "",
          finalStatus: "",
          candidateStatus: "",
          token: "",
          verificationLink: "",
          yearOfPassing: "",
        },
        questions: [
          {question1: "" ,
           question2: "" ,
           question3: "" 
          }
        ]
      }
    );
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
    
      if (name.startsWith("questions[")) {
        const questionIndex = parseInt(name.split("[")[1].split("]")[0], 10);
        const questionKey = name.split(".")[1];
    
        setFormData((prevData) => {
          const updatedQuestions = [...prevData.questions];
          updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            [questionKey]: type === "file" ? files[0] : value,
          };
    
          return {
            ...prevData,
            questions: updatedQuestions,
          };
        });
      } else if (name.startsWith("lineUp.")) {
        const nestedField = name.split(".")[1];
        setFormData((prevData) => ({
          ...prevData,
          lineUp: {
            ...prevData.lineUp,
            [nestedField]: type === "file" ? files[0] : value,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === "file" ? files[0] : value,
        }));
      }
    };
  
      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };
   
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const currentDate = new Date();
        const updatedFormData = {
          ...formData,
          date: currentDate.toISOString().split("T")[0],
          candidateAddedTime: currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          lineUp: {
            ...formData.lineUp,
            resume: formData.lineUp.resume ? await convertToBase64(formData.lineUp.resume) : null,
            photo: formData.lineUp.photo ? await convertToBase64(formData.lineUp.photo) : null,
          },
        };
      
        console.log("=================================");
        
        console.log(updatedFormData);
        
        // Perform the API request with the modified formData
        try {
          const response = await axios.post("http://localhost:8081/api/calling", updatedFormData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log('Form submitted successfully:', response.data);
          // Handle success (e.g., reset form, show success message)
        } catch (error) {
          console.error("Error submitting form:", error);
          // Handle error (e.g., show an error message)
        }
      }; 
      
  
    return (
      <div className="main-div roboto-medium">
        <div className="subdiv1">
          <div className="logo-container">
            <div>
              <img src={logo1} alt="Company Logo" className="logo" />
              <h1 className="company-name crimson-text-regular">
                157 Industries Private Limited
              </h1>
            </div>
            <p className="description">
              an exceptionally unique experience tailored to you We are idea
              generators, goal seekers, challenge-thirsty professionals, creators
              of unique Internet projects. We deliver unconventional solutions
             
            </p>
            {/* <div className="applicats-indicator">
              <h6>Applicant's Form</h6>
              <FontAwesomeIcon icon={faArrowDownLong} className="name-icon" />
            </div> */}
          </div>
        </div>
        <div className="form-main-div">
          <div className="form-sub-div">
            <div className="form-container scrollable-hidden-scrollbar">
              <h1 className="header roboto-medium">Applicant Form</h1>
              <form className="applicant-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="sub-div">
                    <label>Applicant's Full Name</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faUser} className="name-icon" />
                      <input
                        type="text"
                        name="candidateName"
                        placeholder="Candidate's Full Name"
                        value={formData.candidateName}
                        onChange={handleChange}
                        //AAA
                      />
                    </div>
                  </div>
                  <div className="sub-div">
                    <label>Applicant's Contact Number</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                      <input
                        type="number"
                        placeholder="Contact Number"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        //AAA
                      />
                    </div>
                  </div>
                </div>
  
                <div className="form-row">
                  <div className="sub-div">
                    <label>Applicant's Email Address</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
                      <input
                        type="email"
                        name="candidateEmail"
                        placeholder="Candidate Email"
                        value={formData.candidateEmail}
                        onChange={handleChange}
                        //AAA
                      />
                    </div>
                  </div>
                  <div className="sub-div">
                    <label>Applicant's Current Salary</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faDollarSign} />
                      <input
                        type="number"
                        name="lineUp.currentCTCLakh"
                        placeholder="Lakhs"
                        value={formData.lineUp.currentCTCLakh}
                        onChange={handleChange}
                        //AAA
                      />
                      <span>+</span> {/* Optional separator */}
                      <input
                        type="number"
                        name="lineUp.currentCTCThousand"
                        placeholder="Thousands"
                        value={formData.lineUp.currentCTCThousand}
                        onChange={handleChange}
                        //AAA
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="sub-div">
                    <label>Applicant's Expected Salary</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faDollarSign} />
                      <input
                        type="number"
                        name="lineUp.expectedCTCLakh"
                        placeholder="Lakhs"
                        value={formData.lineUp.expectedCTCLakh}
                        onChange={handleChange}
                        //AAA
                      />
                      <span>+</span> {/* Optional separator */}
                      <input
                        type="number"
                        name="lineUp.expectedCTCThousand"
                        placeholder="Thousands"
                        value={formData.lineUp.expectedCTCThousand}
                        onChange={handleChange}
                        //AAA
                      />
                    </div>
                  </div>
                  <div className="sub-div">
                    <label>Applicant's Education</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faGraduationCap} />
                      <input
                        type="text"
                        name="lineUp.qualification"
                        placeholder="Education"
                        value={formData.lineUp.qualification}
                        onChange={handleChange}
                        //AAA
                      />
                    </div>
                  </div>
                </div>
  
                <div className="form-row">
                  <div className="sub-div">
                    <label>Applicant's Job Designation</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faBriefcase} />
                      <input
                        type="text"
                        name="jobDesignation"
                        placeholder="Designation"
                        value={formData.jobDesignation}
                        onChange={handleChange}
                        //AAA
                      />
                    </div>
                  </div>
                  <div className="sub-div">
                    <label>Applicant's Current Location</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <input
                        type="text"
                        name="currentLocation"
                        placeholder="Current Location"
                        value={formData.currentLocation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
  
                <div className="form-row">
                  <div className="sub-div">
                    <label>Applicant's Preferred Location</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <input
                        type="text"
                        name="lineUp.preferredLocation"
                        placeholder="Preferred Location"
                        value={formData.lineUp.preferredLocation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="sub-div">
                    <label>Applicant's Notice Period</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <input
                        type="text"
                        name="lineUp.noticePeriod"
                        placeholder="Notice Period In Days"
                        value={formData.lineUp.noticePeriod}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
  
                <div className="form-row">
                  <div className="sub-div">
                    <label>Availability For Interview</label>
                    <div className="input-icon-date-picker">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        fullWidth
                        sx={{ border: 0, width: "100%" }}
                        value={formData.availabilityForInterview}
                        onChange={(newValue) => {
                          handleChange({
                            target: {
                              name: "lineUp.availabilityForInterview",
                              value: newValue,
                            },
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              sx: {
                                border: "none",
                              },
                            }}
                            sx={{
                              ".MuiOutlinedInput-root": {
                                "& fieldset": {
                                  border: "none",
                                  borderWidth: "0",
                                },
                              },
                            }}
                          />
                        )}
                      />
                       </LocalizationProvider>
                    </div>
                  </div>
                  <div className="sub-div">
                    <label>Expected Joining Date</label>
                    <div className="input-icon-date-picker">
                      <DatePicker
                        fullWidth
                        sx={{ border: 0, width: "100%" }}
                        value={formData.expectedJoinDate}
                        onChange={(newValue) => {
                          handleChange({
                            target: {
                              name: "lineUp.expectedJoinDate",
                              value: newValue,
                            },
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              sx: {
                                border: "none",
                              },
                            }}
                            sx={{
                              ".MuiOutlinedInput-root": {
                                "& fieldset": {
                                  border: "none",
                                  borderWidth: "0",
                                },
                              },
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
  
                <div className="form-row">
                  <div className="sub-div">
                    <label>Total Experience (Years)</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faBriefcase} />
                      <input
                        type="number"
                        name="lineUp.experienceYear"
                        placeholder="Total Experience (Years)"
                        value={formData.lineUp.experienceYear}
                        onChange={handleChange}
                        //AAA
                      />
                    </div>
                  </div>
                  <div className="sub-div">
                    <label>Relevant Experience</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faBriefcase} />
                      <input
                        type="text"
                        name="lineUp.relevantExperience"
                        placeholder="Relevant Experience"
                        value={formData.lineUp.relevantExperience}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
  
                <div className="form-row">
                  <div className="sub-div">
                    <label>Gender</label>
                    <div>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={formData.lineUp.gender === "male"}
                            onChange={() =>
                              handleChange({
                                target: { name: "lineUp.gender", value: "male" },
                              })
                            }
                          />
                        }
                        label="Male"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            checked={formData.lineUp.gender === "female"}
                            onChange={() =>
                              handleChange({
                                target: { name: "lineUp.gender", value: "female" },
                              })
                            }
                          />
                        }
                        label="Female"
                      />
                    </div>
                  </div>
                </div>
  
                <div className="form-row">
                  <div className="sub-div">
                    <label>Are You Holding Any Offer?</label>
                    <div className="input-icon-date">
                      <FormControlLabel
                        control={
                          <Radio
                            checked={formData.lineUp.holdingAnyOffer}
                            onChange={(e) =>
                              handleChange({
                                target: {
                                  name: "lineUp.holdingAnyOffer",
                                  value: e.target.checked,
                                },
                              })
                            }
                          />
                        }
                        label="Yes"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            checked={!formData.lineUp.holdingAnyOffer}
                            onChange={(e) =>
                              handleChange({
                                target: {
                                  name: "lineUp.holdingAnyOffer",
                                  value: false,
                                },
                              })
                            }
                          />
                        }
                        label="No"
                      />
                    </div>
                  </div>
                </div>
  
                {formData.lineUp.holdingAnyOffer && (
                  <div className="offer-details">
                    <div className="form-row">
                      <div className="sub-div">
                        <label>Offer Company Name</label>
                        <input
                          type="text"
                          name="lineUp.companyName"
                          placeholder="company Name"
                          value={formData.lineUp.companyName}
                          onChange={handleChange}
                          //AAA
                          className="form-textfield"
                        />
                      </div>
                      <div className="sub-div">
                        <label>Offer Salary (Lakh)</label>
                        <input
                          type="number"
                          name="lineUp.offersalary"
                          placeholder="Salary (Lakh)"
                          value={formData.lineUp.offersalary}
                          onChange={handleChange}
                          //AAA
                          className="form-textfield"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="sub-div">
                        <label>Offer Details</label>
                        <textarea
                          name="lineUp.offerdetails"
                          placeholder="Details about the offer"
                          value={formData.lineUp.offerdetails}
                          onChange={handleChange}
                          rows="4"
                          className="form-textfield"
                        />
                      </div>
                    </div>
                  </div>
                )}
  
                <div className="form-row">
                  <div className="sub-div">
                    <label>Have You Done Any Courses and Certificates?</label>
                    <div className="input-icon">
                      <FontAwesomeIcon icon={faCertificate} />
                      <input
                        type="text"
                        name="lineUp.sslCertificates"
                        placeholder="SSL Certificates"
                        value={formData.lineUp.sslCertificates}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
  
          {/*      <div className="form-row">
                  <div className="sub-div">
                    <label>Negotiable</label>
                    <div className="input-icon">
                      <FormControlLabel
                        control={
                          <Radio
                            checked={formData.lineup.negotiable === true}
                            onChange={(e) =>
                              handleChange({
                                target: {
                                  name: "lineup.negotiable",
                                  value: true,
                                },
                              })
                            }
                          />
                        }
                        label={<span>Yes&nbsp;</span>}
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            checked={formData.lineup.negotiable === false}
                            onChange={(e) =>
                              handleChange({
                                target: {
                                  name: "lineup.negotiable",
                                  value: false,
                                },
                              })
                            }
                          />
                        }
                        label="No"
                      />
                    </div>
                  </div>
                </div>
  
                {formData.lineup.negotiable && (
                  <div className="details">
                    <div className="form-row">
                      <div className="input-icon">
                        <FontAwesomeIcon icon={faCircleInfo} />
                        <input
                          type="text"
                          name="negotiable"
                          placeholder=" Please specify negotiable or not and notice period buyout yes or no"
                          value={formData.negotiable}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}  */}
  
                <div className="submit-form-row">
                  <div className="submit-file-area">
                    <div style={{ display: "flex", paddingY: 10 }}>
                      <label style={{ flex: 1, fontSize: "14px" }}>
                        Upload Your Resume
                      </label>
                      <input
                        type="file"
                        name="lineUp.resume"
                        onChange={handleChange}
                        accept=".pdf,.doc,.docx"
                        //AAA
                      />
                    </div>
                  </div>
  
                  <div className="submit-file-area">
                    <div style={{ display: "flex" }}>
                      <label style={{ flex: 1, fontSize: "14px" }}>
                        Upload Your Photo
                      </label>
                      <input
                        type="file"
                        name="formData.lineUp.photo"
                        onChange={handleChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
  
                <div className="form-row">
                  <div className="sub-div">
                    <label>What motivated you to apply for this position?</label>
                    <textarea
                         name="questions[0].question1"
                         className="form-textfield"
                         placeholder="Your motivation for applying"
                          value={formData.questions[0].question1}
                           onChange={handleChange}
                           rows="4"
                           //AAA
                            />
                  </div>
                </div>
                <div className="form-row">
                  <div className="sub-div">
                    <label>
                      How do you prioritize your tasks when working on multiple
                      projects?
                    </label>
                    <textarea
                           className="form-textfield"
                         name="questions[0].question2"
                          placeholder="Your approach to prioritization"
                             value={formData.questions[0].question2}
                           onChange={handleChange}
                        rows="4"
                        //AAA
                           />
                  </div>
                </div>
  
                <div className="form-row">
                  <div className="sub-div">
                    <label>
                      How do you prioritize your tasks when working on multiple
                      projects?
                    </label>
                    <textarea
                        className="form-textfield"
                       name="questions[0].question3"
                       placeholder="Your approach to deadline management"
                       value={formData.questions[0].question3}
                       onChange={handleChange}
                         rows="4"
                         //AAA
                          /></div>
                         </div> 
  
                <div className="submit-div">
                  <button className="submit-button" type="hyperlink">
                    Aptitude Test
                  </button>
                </div>
  
                <div className="submit-div">
                  <button className="submit-button" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ApplicantForm;
  
  