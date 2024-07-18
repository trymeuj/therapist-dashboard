import React, { useState } from "react";
import { Card, Col, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Row } from "reactstrap";

const Badges = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const [timetable, setTimetable] = useState([
    { day: "Monday", "9-10 AM": "", "10-11 AM": "", "11-12 PM": "" },
    { day: "Tuesday", "9-10 AM": "", "10-11 AM": "", "11-12 PM": "" },
    { day: "Wednesday", "9-10 AM": "", "10-11 AM": "", "11-12 PM": "" },
    { day: "Thursday", "9-10 AM": "", "10-11 AM": "", "11-12 PM": "" },
    { day: "Friday", "9-10 AM": "", "10-11 AM": "", "11-12 PM": "" },
  ]);

  const [timeSlots, setTimeSlots] = useState(["9-10 AM", "10-11 AM", "11-12 PM"]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleViewBatchClick = (day, time, content) => {
    setModalContent({ ...content, day, time });
    toggleModal();
  };

  const parseTime = (time) => {
    const [range, period] = time.split(' ');
    const [start] = range.split('-').map(t => parseInt(t, 10));
    return { start, period };
  };

  const sortTimeSlots = (slots) => {
    return slots.sort((a, b) => {
      const { start: startA, period: periodA } = parseTime(a);
      const { start: startB, period: periodB } = parseTime(b);
      
      if (periodA === periodB) {
        return startA - startB;
      } else {
        return periodA === 'AM' ? -1 : 1;
      }
    });
  };

  const addTimeSlot = () => {
    const newTimeSlot = prompt("Enter new time slot (e.g., 12-1 PM):");
    if (newTimeSlot && !timeSlots.includes(newTimeSlot)) {
      const updatedTimeSlots = [...timeSlots, newTimeSlot];
      const sortedTimeSlots = sortTimeSlots(updatedTimeSlots);
      setTimeSlots(sortedTimeSlots);
      setTimetable(timetable.map((day) => ({ ...day, [newTimeSlot]: "" })));
    }
  };

  const patientInfo = {
    "John Doe": { name: "John Doe", info: "Patient info about John Doe", photo: "https://via.placeholder.com/150" },
    "Jane Doe": { name: "Jane Doe", info: "Patient info about Jane Doe", photo: "https://via.placeholder.com/150" },
    "Jim Doe": { name: "Jim Doe", info: "Patient info about Jim Doe", photo: "https://via.placeholder.com/150" },
    "No Patient": { name: "No Patient", info: "No patient info available", photo: "" },
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Timetable</CardTitle>
          <Row className="mb-3">
            <Col className="d-flex justify-content-end">
              <Button color="primary" onClick={addTimeSlot}>
                Add Slot
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Day/Slot</th>
                    {timeSlots.map((slot) => (
                      <th key={slot}>{slot}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((slot, index) => (
                    <tr key={index}>
                      <td>{slot.day}</td>
                      {timeSlots.map((time) => (
                        <td key={time}>
                          {slot[time] ? (
                            <span
                              className="text-primary"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleViewBatchClick(slot.day, time, patientInfo[slot[time]])}
                            >
                              {slot[time]}
                            </span>
                          ) : (
                            <Button
                              className="btn"
                              outline
                              color="primary"
                              onClick={() => handleViewBatchClick(slot.day, time, patientInfo["Jim Doe"])}
                            >
                              View Batch
                            </Button>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Batch Information - {modalContent.day} ({modalContent.time})</ModalHeader>
        <ModalBody>
          {modalContent.name !== "No Patient" ? (
            <>
              <img src={modalContent.photo} alt="Patient" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
              <h5>{modalContent.name}</h5>
              <p>{modalContent.info}</p>
              <h6>All Patients:</h6>
              <ul>
                {Object.keys(patientInfo).map((key) => (
                  key !== "No Patient" && (
                    <li key={key}>
                      <img src={patientInfo[key].photo} alt={patientInfo[key].name} style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} />
                      {patientInfo[key].name}
                    </li>
                  )
                ))}
              </ul>
            </>
          ) : (
            <p>No patients available</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
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

export default Badges;
