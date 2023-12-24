import React from "react";
import Sidebar from "../Sidebar";
import RecApplications from "./recApplications";
const ReceivedCVs = () => {
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <Sidebar>
        <h3> Received CVs</h3>
        <br></br>
        <RecApplications/>
      </Sidebar>
    </div>
  );
};

export default ReceivedCVs;
