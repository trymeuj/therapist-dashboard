import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Spinner,
} from "reactstrap";
import { signUp } from "../../database/methods";

const SignupForm = () => {
  const [loading,setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    phone: "",
    gender: "",
    city: "",
    registration_No: "",
    registration_year: "",
    profile:'',
    qualification: "",
    college: "",
    experience: "",
    batches:[],
    patients:[]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <CardBody>
              {step === 1 && (
                <Form>
                  <h4>Profile Details</h4>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">Phone Number</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Gender</Label>
                    <div>
                      <FormGroup check inline>
                        <Input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleChange}
                        />
                        <Label check>Male</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleChange}
                        />
                        <Label check>Female</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          type="radio"
                          name="gender"
                          value="Other"
                          checked={formData.gender === "Other"}
                          onChange={handleChange}
                        />
                        <Label check>Other</Label>
                      </FormGroup>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button color="primary" onClick={nextStep}>
                    Continue
                  </Button>
                </Form>
              )}
              {step === 2 && (
                <Form onSubmit={handleSubmit}>
                  <h4>Medical Information</h4>
                  <FormGroup>
                    <Label for="registrationNumber">Registration Number</Label>
                    <Input
                      type="text"
                      name="registrationNumber"
                      id="registrationNumber"
                      placeholder="Enter your registration number"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="registrationYear">Registration Year</Label>
                    <Input
                      type="text"
                      name="registrationYear"
                      id="registrationYear"
                      placeholder="Enter your registration year"
                      value={formData.registrationYear}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="qualification">Qualification</Label>
                    <Input
                      type="select"
                      name="qualification"
                      id="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                    >
                      <option value="">Select Qualification</option>
                      <option value="MBBS">MBBS</option>
                      <option value="MD">MD</option>
                      <option value="BDS">BDS</option>
                      {/* Add more options as needed */}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="college">College</Label>
                    <Input
                      type="select"
                      name="college"
                      id="college"
                      value={formData.college}
                      onChange={handleChange}
                    >
                      <option value="">Select College</option>
                      <option value="AIIMS">AIIMS</option>
                      <option value="JIPMER">JIPMER</option>
                      <option value="MAMC">MAMC</option>
                      {/* Add more options as needed */}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="experience">Experience (in years)</Label>
                    <Input
                      type="text"
                      name="experience"
                      id="experience"
                      placeholder="Enter your experience"
                      value={formData.experience}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password (more than 6 characters)</Label>
                    <Input
                      type="text"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button color="secondary" onClick={prevStep}>
                    Back
                  </Button>
                  <Button color="primary" type="submit" onClick={async ()=>{
                    setLoading(true);
                     signUp(formData,formData.email,formData.password).then(()=>{
                      setLoading(false);
                      
                     });
                  }}>
                    {loading?<Spinner color="primary" />:"Submit"}
                  </Button>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
