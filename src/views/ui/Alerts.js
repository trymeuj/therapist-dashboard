import React, { useState } from "react";
import { Card, Col, CardBody, CardTitle, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import myPic from './img123456.svg';

const Alerts = () => {
  // State to manage modal visibility for viewing content
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  // State to manage modal visibility for adding new person
  const [addModal, setAddModal] = useState(false);
  const [newPerson, setNewPerson] = useState({ level: "", desc: "", exercise: "", remarks: "", contentType: "image", file: null, description: "" });
  const [exercises, setExercises] = useState([
    { id: 1, level: 1, desc: "Mark", exercise: "Otto", remarks: "@mdo", content: { type: "image", src: "https://via.placeholder.com/150", description: "Example image" } },
    { id: 2, level: 2, desc: "Jacob", exercise: "Thornton", remarks: "@fat", content: { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", description: "Example video" } },
    { id: 3, level: 3, desc: "Larry", exercise: "the Bird", remarks: "@twitter", content: { type: "image", src: "https://via.placeholder.com/150", description: "Example image" } },
  ]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleAddModal = () => {
    setAddModal(!addModal);
  };

  const handleExerciseClick = (content) => {
    setModalContent(content);
    toggleModal();
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewPerson({ ...newPerson, [name]: files[0] });
    } else {
      setNewPerson({ ...newPerson, [name]: value });
    }
  };

  const handleAddPerson = () => {
    const newId = exercises.length + 1;
    const newEntry = {
      id: newId,
      level: newPerson.level,
      desc: newPerson.desc,
      exercise: newPerson.exercise,
      remarks: newPerson.remarks,
      content: { type: newPerson.contentType, src: URL.createObjectURL(newPerson.file), description: newPerson.description },
    };
    setExercises([...exercises, newEntry]);
    toggleAddModal();
  };

  return (
    <div>
      <Col lg="12">
        <Card>
          <CardBody className="">
            <Button className="btn mb-3" outline color="danger" onClick={toggleAddModal}>
              Add New
            </Button>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Level Desc</th>
                  <th>Exercise</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <th scope="row">{exercise.level}</th>
                    <td>{exercise.desc}</td>
                    <td>
                      <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => handleExerciseClick(exercise.content)}>
                        {exercise.exercise}
                      </span>
                    </td>
                    <td>{exercise.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Exercise Content</ModalHeader>
        <ModalBody>
        
        <img src={myPic} alt="Exercise" style={{ width: "100%" }} />
          
          <p>Apply a drop of honey at the shown point in Amol’s mouth and ask him to try to lick it, repeat this 4-5 times then ask him to blow air while licking the honey</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={addModal} toggle={toggleAddModal}>
        <ModalHeader toggle={toggleAddModal}>Add New Person</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="level">Level</Label>
              <Input type="text" name="level" id="level" value={newPerson.level} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Level Desc</Label>
              <Input type="text" name="desc" id="desc" value={newPerson.desc} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exercise">Exercise</Label>
              <Input type="text" name="exercise" id="exercise" value={newPerson.exercise} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="remarks">Remarks</Label>
              <Input type="text" name="remarks" id="remarks" value={newPerson.remarks} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="contentType">Content Type</Label>
              <Input type="select" name="contentType" id="contentType" value={newPerson.contentType} onChange={handleInputChange}>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="file">Content File</Label>
              <Input type="file" name="file" id="file" onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="text" name="description" id="description" value={newPerson.description} onChange={handleInputChange} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddPerson}>
            Add
          </Button>
          <Button color="secondary" onClick={toggleAddModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <style jsx global>{`
        body.modal-open {
          overflow: hidden;
        }
        .modal-backdrop.show {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default Alerts;
