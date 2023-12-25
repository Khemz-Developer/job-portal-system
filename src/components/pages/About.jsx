import React from "react";

import "./about.css";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className="About-main-div">
      <br />
      <br />
      <br />
      <div className="container">
        <h1 className="Main-Topic">SLT-Mobitel Job Portal System</h1>
        <p className="paragraph-top">Welcome to the SLT-Mobitel Job Portal System, where opportunities meet talent in the digital realm. Our job portal is a dynamic platform designed to connect job seekers with exciting career opportunities and assist employers in finding the perfect match for their teams.</p>
    </div>
      <div className="row pt-5 ">
        <div className="image-about col">
          <img className="image-about" src="https://www.myjobgator.com/assets/img/career.jpg" alt="" />
        </div>
        <div className="col mt-5 pt-3">
          <h2 className="Main-Topic-2">Advance your career with SLTMobitel</h2>
          <p className="paragraph-2">Create a free account, complete your profile, and get matched with your<br/> dream job.</p>
          <Link to='/users/login' className="btn-started">GET STARTED!</Link>
        </div>
        
      </div>
      
      

      <br />
      <br />
      <br />
      <br />
      <br />

     
    </div>
  );
};

export default About;
