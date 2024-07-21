import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Dummy data for doctors
const initialContributors = ["Dr. Vibha", "Dr. A", "Dr. B"];
const allDoctors = ["Dr. Vibha", "Dr. A", "Dr. B", "Dr. C", "Dr. D", "Dr. E", "Dr. F", "Dr. G", "Dr. H", "Dr. I"];

const Contributions = () => {
  const [contributors, setContributors] = useState(initialContributors);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const addContributor = (doctor) => {
    if (!contributors.includes(doctor)) {
      setContributors([...contributors, doctor]);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h1>Contributions Screen</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Contributors:</h3>
          <Card>
            <CardBody>
              {contributors.join(", ")}
              <Button color="primary" className="ml-3" onClick={toggleModal}>
                See All
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modal for adding contributors */}
      <Modal isOpen={modalOpen} toggle={toggleModal} className="modal-lg">
        <ModalHeader toggle={toggleModal}>Add Contributors</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <h4>Current Contributors</h4>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Contributors</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors.map((contributor, index) => (
                    <tr key={index}>
                      <td>{contributor}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Add More</h4>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Doctors</th>
                  </tr>
                </thead>
                <tbody>
                  {allDoctors
                    .filter((doctor) => !contributors.includes(doctor))
                    .map((doctor, index) => (
                      <tr key={index}>
                        <td>
                          {doctor}
                          <Button
                            color="success"
                            className="ml-3"
                            onClick={() => addContributor(doctor)}
                          >
                            Add
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default Contributions;
