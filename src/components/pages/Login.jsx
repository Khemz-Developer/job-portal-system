import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/images/loginn.png";
import { useAuth } from "../../authContext";
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (event)=>{
    event.preventDefault();

    try {
      // Make an HTTP POST request to your backend login endpoint
      const response = await axios.post('http://localhost:3001/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful');
        alert('Login Successfull');
        const { isAdmin } = response.data;
        login();
        if(isAdmin){
          navigate('../admin/create');
        }else{
          navigate('../users/uservacancy');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if(error.response.status===401){
        alert('Password is incorrect');
      }else if(error.response.status===404){
        alert('User not found');
      }
      // Handle login failure, show an error message, etc.
    }

  }
  
  
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
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
                      <Link to="/users/signup" className="link-inline m-2">
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
