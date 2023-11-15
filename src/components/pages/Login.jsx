import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../../assets/images/loginn.png";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import './login.css'


const Login = () => {
  return (
    
      <div>
        <br></br><br></br><br></br>
      <div className="mt-5">
        <div className="login-main-div">
          <div className="container login-inner-div">
            <Container>
              <Row className="row-1-login">
                <Col md={5} className="col-1-login">
                  <h2 className="login-name">Sign In</h2>
                  <form>
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

                    <div className="d-flex justify-content-center btn-submit-login mt-4 ">
                      <Button
                        className="btn-custom-width"
                        type="submit"
                        variant="light"
                      >
                        Submit
                      </Button>
                    </div>
                    <div className="d-flex align-items-center ">
                      <p
                        className="paragraph mb-0 mr-2 "
                        style={{ fontSize: "small" }}
                      >
                        Don't You Have Account ?
                      </p>
                      <Link to="/signup" className="link-inline m-2">
                        Sign Up
                      </Link>
                    </div>
                  </form>
                </Col>

                <Col md={6} className="col-2-login container ">
                  <img src={Logo} alt=" Logo" className="login-image " />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Login;
