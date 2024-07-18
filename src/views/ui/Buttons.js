import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

const Buttons = () => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const toggleDetails = () => {
    setShowMoreDetails(!showMoreDetails);
  };

  // Dummy data
  const profileData = {
    image: "https://via.placeholder.com/150",
    name: "John Doe",
    phoneNumber: "123-456-7890",
    gender: "Male",
    city: "San Francisco",
    registrationNumber: "12345",
    therapyCenter: "XYZ Therapy Center",
    numPatients: 50,
    additionalInfo: {
      registrationYear: "2010",
      qualification: "MD",
      college: "ABC Medical College",
      experience: "10 years",
    },
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <CardBody>
              <Row className="align-items-center mb-4">
                <Col md="4" className="text-center">
                  <div style={{ position: "sticky", top: "20px" }}>
                    <img
                      src={profileData.image}
                      alt="Profile"
                      className="img-fluid"
                    />
                  </div>
                </Col>
                <Col md="8">
                  <CardTitle tag="h4">Therapist Profile</CardTitle>
                  <CardText>Name: {profileData.name}</CardText>
                  <CardText>Phone Number: {profileData.phoneNumber}</CardText>
                  <CardText>Gender: {profileData.gender}</CardText>
                  <CardText>City: {profileData.city}</CardText>
                  <CardText>
                    Registration Number: {profileData.registrationNumber}
                  </CardText>
                  <CardText>
                    Therapy Center: {profileData.therapyCenter}
                  </CardText>
                  <CardText>
                    Number of Patients: {profileData.numPatients}
                  </CardText>
                  <Button color="primary" onClick={toggleDetails}>
                    {showMoreDetails ? "Hide Details" : "See More Details"}
                  </Button>
                  {showMoreDetails && (
                    <div className="mt-4">
                      <CardTitle tag="h5">Additional Information</CardTitle>
                      <CardText>
                        Registration Year: {profileData.additionalInfo.registrationYear}
                      </CardText>
                      <CardText>
                        Qualification: {profileData.additionalInfo.qualification}
                      </CardText>
                      <CardText>
                        College: {profileData.additionalInfo.college}
                      </CardText>
                      <CardText>
                        Experience: {profileData.additionalInfo.experience}
                      </CardText>
                    </div>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Buttons;
