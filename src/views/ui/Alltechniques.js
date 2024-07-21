import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

const AllTechniques = () => {
  const [filterModal, setFilterModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const navigate = useNavigate();

  const toggleFilterModal = () => setFilterModal(!filterModal);

  const handleDoctorSelect = (index, doctor) => {
    const newSelectedDoctor = [...selectedDoctor];
    newSelectedDoctor[index] = doctor;
    setSelectedDoctor(newSelectedDoctor);
  };

  const toggleDropdown = (index) => {
    const newDropdownOpen = [...dropdownOpen];
    newDropdownOpen[index] = !newDropdownOpen[index];
    setDropdownOpen(newDropdownOpen);
  };

  // Dummy data for techniques
  const techniques = [
    { id: 1, name: "Technique 1", goal: "Goal 1", description: "Description 1", createdBy: "Dr. A" },
    { id: 2, name: "Technique 2", goal: "Goal 2", description: "Description 2", createdBy: "Dr. B" },
    { id: 3, name: "Technique 3", goal: "Goal 3", description: "Description 3", createdBy: "Dr. A" },
    // Add more techniques as needed
  ];

  const handleSeeContributionsClick = () => {
    navigate("/contributions");
  };

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h1>ABC Therapy Center</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h3>Total Exercises: N</h3>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-start">
          <Button color="primary" onClick={toggleFilterModal}>Filter</Button>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button color="primary" onClick={handleSeeContributionsClick}>See Contributions</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Table className="no-wrap mt-3 align-middle" responsive bordered>
                <thead>
                  <tr>
                    <th>Exercise Name</th>
                    <th>Exercise Goal</th>
                    <th>Description</th>
                    <th>Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {techniques.map((technique, index) => (
                    <tr key={technique.id}>
                      <td>{technique.name}</td>
                      <td>{technique.goal}</td>
                      <td>{technique.description}</td>
                      <td>
                        <Dropdown isOpen={dropdownOpen[index] || false} toggle={() => toggleDropdown(index)}>
                          <DropdownToggle caret>
                            {selectedDoctor[index] || "Select Doctor"}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={() => handleDoctorSelect(index, "Dr. A")}>Dr. A</DropdownItem>
                            <DropdownItem onClick={() => handleDoctorSelect(index, "Dr. B")}>Dr. B</DropdownItem>
                            {/* Add more doctors as needed */}
                          </DropdownMenu>
                        </Dropdown>
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
            <Label for="therapist">Created By</Label>
            <div>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Dr. A
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" /> Dr. B
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

export default AllTechniques;
