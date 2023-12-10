import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import companyLogo from "../assets/images/sltlogo.png";
import { useAuth } from "../authContext";
import "./navbar.css";
const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMemuOpen] = useState(false);

  return (
    //navbar ekt pitin div ekk demma
    <div className="content-containerr">
      <nav className="navBar">
        {/* <a href="/" className="site-title">SLTMOBITEL </a> */}
        <Link to="/">
          <img src={companyLogo} alt="Company Logo" className="company-logo" />
        </Link>
        <div
          className="menu"
          onClick={() => {
            setMemuOpen(!menuOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`white-background-wrapper ${menuOpen ? "hidden" : ""}`}>
          <div className="">
            <ul className={menuOpen ? "open" : ""}>
            {!isLoggedIn && (
              <>
              <li>
                <NavLink to="/" >Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">AboutUs</NavLink>
              </li>
              <li>
                <NavLink to="/vacancies">Vacancies</NavLink>
              </li>
              </>
              )}
              <li>
                {isLoggedIn ? (
                  <NavLink to="/"> 
                  <button onClick={logout}>Logout</button>
                  </NavLink>
                ) : (
                  <NavLink to="/users/login">Login</NavLink>
                )}
              </li>
              
            
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
