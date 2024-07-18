import React, { useState, useEffect } from "react";
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import ProjectTables from "../components/dashboard/ProjectTable";
import { db } from "../firebase";  // Import Firestore
import { collection, getDocs, addDoc, writeBatch, doc } from 'firebase/firestore';

const Starter = () => {
  const [modal, setModal] = useState(false);
  const [newPerson, setNewPerson] = useState({
    name: "",
    age: "",
    parentsName: "",
    parentsMobile: "",
    dob: "",
    doj: ""
  });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch data from Firestore on component mount
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'patientinfo'));
      const data = querySnapshot.docs.map((doc, index) => ({
        ...doc.data(),
        id: doc.id,
        num: index + 1
      }));

      if (data.length === 0) {
        const initialData = [
          {
            name: "Anurag Tiwari",
            age: "25",
            parentsName: "Mr. Tiwari",
            parentsMobile: "1234567890",
            dob: "1995-01-01",
            doj: "2020-01-01"
          },
          {
            name: "Ekansh Agarwal",
            age: "25",
            parentsName: "Mr. Agarwal",
            parentsMobile: "1234567890",
            dob: "1995-01-01",
            doj: "2020-01-01"
          },
          {
            name: "Tejas Kumar",
            age: "25",
            parentsName: "Mr. Kumar",
            parentsMobile: "1234567890",
            dob: "1995-01-01",
            doj: "2020-01-01"
          },
          {
            name: "Ujjwal Mathur",
            age: "25",
            parentsName: "Mr. Tiwari",
            parentsMobile: "1234567890",
            dob: "1995-01-01",
            doj: "2020-01-01"
          }
        ];

        const batch = writeBatch(db);
        initialData.forEach((data) => {
          const docRef = doc(collection(db, 'patientinfo'));
          batch.set(docRef, data);
        });
        await batch.commit();

        const newData = initialData.map((data, index) => ({
          ...data,
          id: data.id,
          num: index + 1
        }));
        setTableData(newData);
      } else {
        setTableData(data);
      }
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleAddPerson = async () => {
    try {
      // Add new person to Firestore
      const docRef = await addDoc(collection(db, 'patientinfo'), newPerson);
      const newEntry = { ...newPerson, id: docRef.id, num: tableData.length + 1 };
      const updatedTableData = [...tableData, newEntry];
      setTableData(updatedTableData);

      setNewPerson({
        name: "",
        age: "",
        parentsName: "",
        parentsMobile: "",
        dob: "",
        doj: ""
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <Row>
        <Col lg="12" className="d-flex justify-content-end mb-3">
          <Button color="primary" onClick={toggleModal}>
            Add New Person
          </Button>
        </Col>
        <Col lg="12">
          <ProjectTables data={tableData} />
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New Person</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" id="name" value={newPerson.name} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="age">Age</Label>
              <Input type="number" name="age" id="age" value={newPerson.age} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="parentsName">Parent's Name</Label>
              <Input type="text" name="parentsName" id="parentsName" value={newPerson.parentsName} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="parentsMobile">Parents' Mobile Number</Label>
              <Input type="text" name="parentsMobile" id="parentsMobile" value={newPerson.parentsMobile} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="dob">Date of Birth</Label>
              <Input type="date" name="dob" id="dob" value={newPerson.dob} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="doj">Date of Joining</Label>
              <Input type="date" name="doj" id="doj" value={newPerson.doj} onChange={handleInputChange} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddPerson}>
            Add
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Starter;
