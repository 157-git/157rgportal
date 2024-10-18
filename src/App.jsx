/*Name : vaibhavi kawarkhe
  Task : providing option for keyword search and filter options in recruiter section
  Task date: 15/10/2024*/ 

import React from "react"; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./portalDashboard/header";
import Recruiter from "./portalDashboard/recruiter";
import Candidate from "./portalDashboard/candidate";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/candidate" element={<Candidate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

