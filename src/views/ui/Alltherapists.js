import React, { useState } from "react";
import { Container, Row, Col, Button, Card, CardBody, Table, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample data for doctors
const doctors = [
  { id: 1, name: "Dr. Vidha", photo: "path/to/photo1.jpg", specialization: "Speech Therapy", experience: "10 years" },
  { id: 2, name: "Dr. Kumar", photo: "path/to/photo2.jpg", specialization: "Physical Therapy", experience: "8 years" },
  { id: 3, name: "Dr. A", photo: "path/to/photo3.jpg", specialization: "Occupational Therapy", experience: "12 years" },
  { id: 4, name: "Dr. B", photo: "path/to/photo4.jpg", specialization: "Speech Therapy", experience: "7 years" },
  { id: 5, name: "Dr. C", photo: "path/to/photo5.jpg", specialization: "Physical Therapy", experience: "15 years" },
  { id: 6, name: "Dr. D", photo: "path/to/photo6.jpg", specialization: "Occupational Therapy", experience: "9 years" },
  { id: 7, name: "Dr. E", photo: "path/to/photo7.jpg", specialization: "Speech Therapy", experience: "11 years" },
  { id: 8, name: "Dr. F", photo: "path/to/photo8.jpg", specialization: "Physical Therapy", experience: "6 years" },
  { id: 9, name: "Dr. G", photo: "path/to/photo9.jpg", specialization: "Occupational Therapy", experience: "8 years" },
  { id: 10, name: "Dr. H", photo: "path/to/photo10.jpg", specialization: "Speech Therapy", experience: "13 years" },
];

const AllTherapists = () => {
  const [filterModal, setFilterModal] = useState(false);
  const navigate = useNavigate();

  const toggleFilterModal = () => setFilterModal(!filterModal);

  const handleSeeProfile = () => {
    navigate(`/buttons`);
  };

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h1>ABC Therapy Center</h1>
        </Col>
      </Row>
      <Row className="text-center mb-4">
        <Col>
          <h3>All Therapists</h3>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-start">
          <Button color="primary" onClick={toggleFilterModal}>Filter</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Table className="no-wrap mt-3 align-middle" responsive bordered>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor, index) => (
                    <tr key={doctor.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={doctor.photo}
                          alt={doctor.name}
                          className="rounded-circle"
                          style={{ width: "50px", height: "50px", marginRight: "10px" }}
                        />
                        {doctor.name}
                      </td>
                     
                      <td>
                        <Button color="primary" onClick={() => handleSeeProfile(doctor.id)}>
                          See Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Filter Modal */}
      <Modal isOpen={filterModal} toggle={toggleFilterModal} backdropClassName="modal-backdrop-blur">
        <ModalHeader toggle={toggleFilterModal}>Filter</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="specialization">Specialization</Label>
            <div>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Speech Therapy
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Physical Therapy
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Occupational Therapy
                </Label>
              </FormGroup>
              {/* Add more specialization options as needed */}
            </div>
          </FormGroup>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default AllTherapists;
