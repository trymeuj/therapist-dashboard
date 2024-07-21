import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Table,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import userpic from "./my_pic.jpg"; // Replace with the actual path to your image

const Feedetail = () => {
  const [entries, setEntries] = useState([
    { id: 1, month: "January 2024", amount: 3000, paidOn: "01-01-24" },
    { id: 2, month: "February 2024", amount: 3000, paidOn: "02-01-24" },
    { id: 3, month: "March 2024", amount: 3000, paidOn: "03-01-24" },
    { id: 4, month: "April 2024", amount: 3000, paidOn: "04-01-24" },
    { id: 5, month: "May 2024", amount: 3000, paidOn: "05-01-24" },
    { id: 6, month: "June 2024", amount: 3000, paidOn: "06-01-24" },
    { id: 7, month: "July 2024", amount: 3000, paidOn: "07-01-24" },
    { id: 8, month: "August 2024", amount: 3000, paidOn: "08-01-24" },
    { id: 9, month: "September 2024", amount: 3000, paidOn: "09-01-24" },
    { id: 10, month: "October 2024", amount: 3000, paidOn: "10-01-24" },
  ]);
  const [newEntry, setNewEntry] = useState({ month: new Date(), amount: "", paidOn: new Date() });
  const [addEntryModal, setAddEntryModal] = useState(false);

  const toggleAddEntryModal = () => setAddEntryModal(!addEntryModal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setNewEntry({ ...newEntry, [name]: date });
  };

  const addNewEntry = () => {
    setEntries([
      ...entries,
      {
        ...newEntry,
        id: entries.length + 1,
        month: newEntry.month.toLocaleString("default", { month: "long", year: "numeric" }),
        paidOn: newEntry.paidOn.toLocaleDateString("en-GB"),
      },
    ]);
    setNewEntry({ month: new Date(), amount: "", paidOn: new Date() });
    toggleAddEntryModal();
  };

  return (
    <Container className="mt-5">
      <Row className="text-center mb-4">
        <Col>
          <h1>Fee Details Page</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg="2">
          <img src={userpic} alt="User" className="rounded-circle" style={{ width: "100px" }} />
        </Col>
        <Col lg="10">
          <h3>Name: Rohan</h3>
          <h4>Father/Parent: John Doe</h4>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <Button color="primary" onClick={toggleAddEntryModal}>Add Entry</Button>
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
                    <th>For Month</th>
                    <th>Amount</th>
                    <th>Paid On</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={entry.id}>
                      <td>{index + 1}</td>
                      <td>{entry.month}</td>
                      <td>{entry.amount}</td>
                      <td>{entry.paidOn}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Add Entry Modal */}
      <Modal isOpen={addEntryModal} toggle={toggleAddEntryModal}>
        <ModalHeader toggle={toggleAddEntryModal}>Add Entry</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="month">For Month</Label>
            <DatePicker
              selected={newEntry.month}
              onChange={(date) => handleDateChange(date, "month")}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <Label for="amount">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter amount"
              value={newEntry.amount}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="paidOn">Paid On</Label>
            <DatePicker
              selected={newEntry.paidOn}
              onChange={(date) => handleDateChange(date, "paidOn")}
              dateFormat="dd-MM-yyyy"
              className="form-control"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addNewEntry}>Add Entry</Button>{' '}
          <Button color="secondary" onClick={toggleAddEntryModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Feedetail;
