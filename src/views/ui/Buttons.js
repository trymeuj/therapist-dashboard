import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  CardTitle,
  CardText,
} from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";

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

  // Dummy patient data
  const patients = [
    { num: 1, name: "Rohan", batch: "MWF", time: "8-9" },
    { num: 2, name: "Sohan", batch: "TTS", time: "9-10" },
    { num: 3, name: "Mohan", batch: "MWF", time: "10-11" },
    // Add more patients as needed
  ];

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="8">
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
              <div className="d-flex justify-content-between align-items-start">
                <CardTitle tag="h4">Therapist Profile</CardTitle>
                <Button color="primary">See Schedule</Button>
              </div>
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
          <Row className="mt-5">
            <Col>
              <CardTitle tag="h5">Patient Details</CardTitle>
              <div >
                <ProjectTables data={patients} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Buttons;
