import React, { useState } from "react";
import {
  FaBars,
  FaRegChartBar,
  FaTh,
  FaUserAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./UserSidebar.css";

const UserSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/uservacancy",
      name: "Job Vacancies",
      icon: <FaTh />,
    },
    {
      path: "/apply",
      name: "Job Apply",
      icon: <FaUserAlt />,
    },
    {
      path: "/status",
      name: "Job Status",
      icon: <FaRegChartBar />,
    },
    
  ];
  
  
  return (
    <div className="container-user">
      <div
        id="Usersidebar"
        style={{ width: isOpen ? "200px" : "50px" }}
        className="sidebar-user"
      >
        <div className="top_section-user">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo-user">
            User
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars-user">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text-user"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default UserSidebar
