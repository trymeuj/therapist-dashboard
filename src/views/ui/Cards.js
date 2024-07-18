import React from "react";
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
} from "reactstrap";

const LoginForm = () => {
  return (
    <Row className="justify-content-center">
      <Col md="4">
        <Card>
          <CardBody>
            <h4 className="text-center mb-4">Sign In</h4>
            <Form>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
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
                  <a href="#signup" className="text-primary">
                    Signup
                  </a>
                </Col>
              </Row>
              <Button color="primary" block>
                Login
              </Button>
              
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
