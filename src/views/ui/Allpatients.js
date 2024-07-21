import React, { useState } from "react";
import { Container, Row, Col, Button, Card, CardBody, Table, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";

const AllPatients = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  // Dummy patient data with therapist info
  const patients = [
    { num: 1, name: "Rohan", batch: "Batch 1 (MWF)", time: "8-9", therapist: "Dr. Vidha" },
    { num: 2, name: "Sohan", batch: "Batch 2 (TTS)", time: "9-10", therapist: "Dr. Kumar" },
    { num: 3, name: "Mohan", batch: "Batch 1 (MWF)", time: "10-11", therapist: "Dr. Vidha" },
    { num: 4, name: "Ravi", batch: "Batch 2 (TTS)", time: "11-12", therapist: "Dr. Kumar" },
    { num: 5, name: "Karan", batch: "Batch 1 (MWF)", time: "8-9", therapist: "Dr. Vidha" },
    { num: 6, name: "Arjun", batch: "Batch 2 (TTS)", time: "9-10", therapist: "Dr. Kumar" },
    { num: 7, name: "Vijay", batch: "Batch 1 (MWF)", time: "10-11", therapist: "Dr. Vidha" },
    { num: 8, name: "Ajay", batch: "Batch 2 (TTS)", time: "11-12", therapist: "Dr. Kumar" },
    { num: 9, name: "Anil", batch: "Batch 1 (MWF)", time: "8-9", therapist: "Dr. Vidha" },
    { num: 10, name: "Sunil", batch: "Batch 2 (TTS)", time: "9-10", therapist: "Dr. Kumar" },
  ];

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h1>ABC Therapy Center</h1>
        </Col>
      </Row>
      <Row className="text-center mb-4">
        <Col>
          <h3>All Patients</h3>
        </Col>
      </Row>
      <Row className="text-right mb-3">
        <Col className="d-flex justify-content-end">
          <Button color="primary" onClick={toggleModal}>Filter</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <thead>
                  <tr>
                    <th>S No.</th>
                    <th>Name</th>
                    <th>Batch & Time</th>
                    <th>Therapist</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((item, index) => (
                    <tr key={item.num}>
                      <td>{item.num}</td>
                      <td>
                        <Link to={`/userprofile`}>{item.name}</Link>
                      </td>
                      <td>{item.batch} {item.time}</td>
                      <td>{item.therapist}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggleModal} backdropClassName="modal-backdrop-blur">
        <ModalHeader toggle={toggleModal}>Filter</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="batch">Batch</Label>
            <div>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Batch 1
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Batch 2
                </Label>
              </FormGroup>
              {/* Add more batch options as needed */}
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="therapist">Therapist</Label>
            <div>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Dr. Vidha
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Dr. Kumar
                </Label>
              </FormGroup>
              {/* Add more therapist options as needed */}
            </div>
          </FormGroup>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default AllPatients;
