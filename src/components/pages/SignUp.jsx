import React from "react";
import "./signup.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageLogo from "../../assets/images/22.png";

const SignUp = () => {
  return (
    <div className="home-main-div">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <div className="container home-inner-div">
        <Container>
          <Row className="row-1-main">
            <Col md={5} className="col-1-main">
              {/* The background image will be applied here */}
              <img src={ImageLogo} alt="SLT Logo" className="logo-image" />
            </Col>
            <Col md={6} className="col-2-main container">
              <h2 className="register-name">Register</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-control"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    placeholder="Confirm your password"
                  />
                </div>
                <div className="d-flex justify-content-end btn-submit-reg ">
                <button type="submit " className="btn btn-primary custom-btn">
                  Submit
                </button>
                </div>
                
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SignUp;
