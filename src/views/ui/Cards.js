import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { signIn } from "../../database/methods";
import { Navigate, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Row className="justify-content-center">
      <Col md="4">
        <Card>
          <CardBody>
            <h4 className="text-center mb-4">Sign In</h4>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>handleChange(e)}
                  placeholder="Enter your email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) =>handleChange(e)}
                  value={formData.password}
                  placeholder="Enter your password"
                />
              </FormGroup>
              <Row className="mt-3 mb-3">
                <Col xs="6" className="text-left">
                  <a href="#forgot-password" className="text-muted">
                    Forgot Password
                  </a>
                </Col>
                <Col xs="6" className="text-right">
                  <a href="/signup" className="text-primary">
                    Signup
                  </a>
                </Col>
              </Row>
              <Button color="primary" block onClick={async()=>{
                setLoading(true);
                signIn(formData.email,formData.password).then((data)=>{
                  if(data){
                    console.log("Logged in successfully");
                    console.log(data);
                  localStorage.setItem("user",JSON.stringify(data));
                  navigate("/profile", { replace: true });
                  }
                  setLoading(false);
                });
              }}>
                {loading?<Spinner color="primary" />:"Login"}
              </Button>
              
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
