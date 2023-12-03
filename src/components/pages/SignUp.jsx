import axios from "axios";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ImageLogo from "../../assets/images/22.png";
import "./signup.css";

const SignUp = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    //Clear the error when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });

  };

  const validateForm = () => {
    const newErrors = {};
  
    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    setErrors(newErrors);
  
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasErrors = !validateForm();

    if (hasErrors) {
      alert('Invalid Registration. Please correct the errors in the form.');
    } else {
      try {
        // Make an HTTP POST request to your backend registration endpoint
        const response = await axios.post('http://localhost:3001/users/signup', formData);

        if (response.status===201) {
          console.log('Form Data Submitted:', formData);
          alert('User Registration is successful');

          // Redirect to a new route after successful form submission
          // redirect('/users/signup');
        } 
      } catch (error) {
        console.error('Error submitting form:', error);
        if (error.response.status===409) {
          alert('already existing user with the email');
        }else {
          alert('Registration is unsuccessful.Please try again');
        }
      }
    }
  };

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
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errors.email && "is-invalid"}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${errors.password && "is-invalid"}`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-control ${errors.confirmPassword && "is-invalid"}`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
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
