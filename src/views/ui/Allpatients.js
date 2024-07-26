import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, CardBody, Table, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Form, ModalFooter, DropdownToggle, Dropdown, DropdownMenu, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import { assignTherapistToPatient, getPatientsOfTherapyCenter, getTherapistsOfTherapyCenter } from "../../database/methods";

const AllPatients = () => {
  const [modal, setModal] = useState(false);
  const [ps, setPatients] = useState([]);
  const toggleModal = () => setModal(!modal);
  const [pateientModal, setPatientModal] = useState(false)
  const [data, setdata] = useState({ name: '', email: '' })
  const [therapists, setTherapists] = useState([])
  const [selectedBatch, setSelectedBatch] = useState(Array(ps.length).fill("Select Batch"));
  const [batchDropdownOpen, setBatchDropdownOpen] = useState(Array(ps.length).fill(false));
  const handleBatchSelect =async (index, option,tid) =>{
    const newArray = [...selectedBatch];
    newArray[index] = option;
    setSelectedBatch(newArray);
    await assignTherapistToPatient(ps[index].uid, tid)
  };


  useEffect(() => {
    const fetchData = async () => {
      getPatientsOfTherapyCenter('EQCduhED0aOQz4jQ2KWP').then((data) => {
        console.log(data)
        setPatients(data)
      })
    }
    fetchData()

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      getTherapistsOfTherapyCenter('EQCduhED0aOQz4jQ2KWP').then((data) => {
        console.log(data)
        setTherapists(data)
      })
    }
    fetchData()

  }, [])

  useEffect(() => {
    let arr = Array(ps.length).fill("Select Therapist")
    for (let index = 0; index < ps.length; index++) {
      const element = ps[index];
      if (element.therapist) {
        const foundObject = therapists.find(obj => obj.uid === element.therapist);
        arr[index] =foundObject? foundObject.name:"Select Therapist"
      }

    }
    setSelectedBatch(arr)
    setBatchDropdownOpen(Array(ps.length).fill(false))
  }, [ps,therapists])


  const toggleBatchDropdown = (index) => {
    const newArray = [...batchDropdownOpen];
    newArray[index] = !newArray[index];
    setBatchDropdownOpen(newArray);
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
          <h3>All Patients</h3>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-start">
          <Button color="primary" onClick={toggleModal}>Filter</Button>
        </Col>

        <Col className="d-flex justify-content-end">
          <Button color="primary" onClick={() => { setPatientModal(true) }}>Add Patient</Button>
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
                  {ps.map((item, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/userprofile/${item.uid}`}>{item.name}</Link>
                      </td>
                      <td>{item.batch} {item.time}</td>
                      <Dropdown isOpen={batchDropdownOpen[index]} toggle={() => toggleBatchDropdown(index)} key={index}>
                        <DropdownToggle caret>
                          {selectedBatch[index]}
                        </DropdownToggle>
                        <DropdownMenu>

                          {
                            therapists.map((therapist, i) => (
                              <DropdownItem key={i} onClick={() => {
                                handleBatchSelect(index,therapist.name,therapist.uid)
                              }}>
                                {therapist.name}
                              </DropdownItem>
                            ))
                          }
                          
                        </DropdownMenu>
                      </Dropdown>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={pateientModal} toggle={() => setPatientModal(!pateientModal)}>
        <ModalHeader toggle={() => setPatientModal(!pateientModal)}>Add New Patient</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup>
              <Label for="doj">Name</Label>
              <Input type="text" name="name" id="name" value={data.name} onChange={(e) => setdata({ ...data, name: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <Label for="doj">Email</Label>
              <Input type="email" name="email" id="email" value={data.email} onChange={(e) => setdata({ ...data, name: e.target.value })} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>

          <Button color="secondary" onClick={() => {
            setPatientModal(false)
          }}>
            Send Invite
          </Button>
        </ModalFooter>
      </Modal>

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
