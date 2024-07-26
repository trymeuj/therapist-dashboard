import React, { useEffect, useState } from "react";
import { Card, Col, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Row,Form, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, FormGroup, Label, Input, Spinner } from "reactstrap";
import { useAuth } from "../../AuthContext";
import { addNewBatch, configureBatch, getPatientsByIds } from "../../database/methods";
import { set } from "firebase/database";

const Badges = () => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [batchModal, setBatchModal] = useState(false);
  const [batchDropdownOpen, setBatchDropdownOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("Select Batch");
  const [newBatch, setNewBatch] = useState(false);
  const [batch, setBatch] = useState("");
  const [loading,setLoading]=useState("")
  const [patients,setPatients]=useState([])
  const [groupedPatients, setGroupedPatients] = useState({});
  
  const {currentUser}=useAuth()

  useEffect(()=>{
    const getdata=async()=>{
      if(currentUser.patients){
      const p=await getPatientsByIds(currentUser.patients)
      
      setPatients(p)
      groupPatientsByDays(currentUser, p)
      }
    }
    getdata()
  },[])
  console.log(currentUser)
  const toggleBatchDropdown=()=>{
    setBatchDropdownOpen(!batchDropdownOpen)
  }

  const [days,setDays]=useState([])
  const [timetable, setTimetable] = useState([
    { day: "Mon", "9-10 AM": "", "10-11 AM": "", "11-12 PM": "" },
    { day: "Tue", "9-10 AM": "", "10-11 AM": "", "11-12 PM": "" },
    { day: "Wed", "9-10 AM": "", "10-11 AM": "", "11-12 PM": "" },
    { day: "Thu", "9-10 AM": "", "10-11 AM": "", "11-12 PM": "" },
    { day: "Fri", "9-10 AM": "", "10-11 AM": "", "11-12 PM": "" },
  ]);

  const [timeSlots, setTimeSlots] = useState(["9-10 AM", "10-11 AM", "11-12 PM"]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleViewBatchClick = (day, time, content) => {
    setModalContent({ patients:content, day, time });
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
  function toggleElementInArray( element) {
    const array=days
    const index = array.indexOf(element);
    if (index === -1) {
      // Element is not present, so add it
      array.push(element);
    } else {
      // Element is present, so remove it
      array.splice(index, 1);
    }
    setDays([...array])
    
  }
  const patientInfo = {
    "John Doe": { name: "John Doe", info: "Patient info about John Doe", photo: "https://via.placeholder.com/150" },
    "Jane Doe": { name: "Jane Doe", info: "Patient info about Jane Doe", photo: "https://via.placeholder.com/150" },
    "Jim Doe": { name: "Jim Doe", info: "Patient info about Jim Doe", photo: "https://via.placeholder.com/150" },
    "No Patient": { name: "No Patient", info: "No patient info available", photo: "" },
  };

  function groupPatientsByDays(data, patients) {
    const groupedPatients = {};
  
    patients.forEach((patient) => {
      const batch = data.batches[patient.batch];
      if (batch) {
        batch.days.forEach((day) => {
          if (!groupedPatients[day]) {
            groupedPatients[day] = [];
          }
          groupedPatients[day].push(patient);
        });
      }
    });
  
    setGroupedPatients(groupedPatients);
  }
  

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Timetable</CardTitle>
          <Row className="mb-3">
            <Col className="d-flex justify-content-end">
              <Button color="primary" onClick={()=>setBatchModal(true)}>
                My Batches
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
                              onClick={() => handleViewBatchClick(slot.day, time, groupedPatients[slot.day])}
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

      <Modal isOpen={batchModal} toggle={()=> setBatchModal(!batchModal)}>
        <ModalHeader toggle={()=> {
          setNewBatch(false)
          setBatchModal(!batchModal)}}>Edit Batches</ModalHeader>
        <ModalBody>
          
{         !newBatch ?  <Form>
          <Dropdown isOpen={batchDropdownOpen} toggle={() => toggleBatchDropdown()} className="ml-2">
                      <DropdownToggle caret>
                        {selectedBatch}
                      </DropdownToggle>
                      <DropdownMenu>
                      {Object.entries(currentUser.batches).map(([key, value]) => (
        <DropdownItem key={key} onClick={() => {
          setDays([...currentUser.batches[key].days])
          setSelectedBatch(key)
          }}>
          {key}
        </DropdownItem>
      ))}
                      
                      </DropdownMenu>
                    </Dropdown>
        
          <Row className="mt2" style={{marginTop:"10px"}}>
            {
              selectedBatch!=="Select Batch" && ["Mon","Tue","Wed","Thu","Fri",'Sat'].map((day,index)=>(
                
                <Col key={index}>
                  <div onClick={()=>toggleElementInArray(day)} style={{border:"1px solid black",width:"50px" ,
                    borderRadius:"5px",padding:"5px",display:"flex",color:days.includes(day)?"white":"black",
                    justifyContent:"center",background:days.includes(day)?"#2962ff":null,cursor:"pointer"}}>
                  {day}
                  </div>
                </Col>
              ))
            }
          
          </Row>

          </Form>:
          <FormGroup>
          <Label for="batch">Batch</Label>
          <Input type="text" name="batch" id="batch" value={batch} onChange={(e)=>{setBatch(e.target.value)}} />
        </FormGroup>
          }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ async ()=>{
            if(!newBatch){
              setNewBatch(true)
            }else{
              if(batch!==""){
                setLoading("new")
                await addNewBatch(batch,currentUser.uid)
                setBatchModal(false)
                setNewBatch(false)
                setLoading("")
              }
            }            
              
          }
          }>
            {newBatch?  loading==="new"?<Spinner color="primary" />:"Save Batch" :"New Batch"}
          </Button>
          <Button color="primary" onClick={async ()=>{
            setLoading("edit")
            await configureBatch(selectedBatch,currentUser.uid,days,null)
            setBatchModal(false)
            setLoading("")
          }}>
          {loading==="edit"?<Spinner color="white" />:"Save"}
          </Button><div className=""></div>
          <Button color="secondary" onClick={()=> {setBatchModal(false)
            setNewBatch(false)}
          }>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Batch Information - {modalContent.day} ({modalContent.time})</ModalHeader>
        <ModalBody>
          {modalContent.patients&& modalContent.patients.length !== 0 ? (
            <>
              {/* <img src={modalContent.photo} alt="Patient" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
              <h5>{modalContent.name}</h5>
              <p>{modalContent.info}</p> */}
              <h6>All Patients:</h6>
              <ul>
                {modalContent.patients.map((key,index) => (
                (
                    <li key={key}>
                      <img src={modalContent.patients[index].profile ?modalContent.patients[index].profile :"https://via.placeholder.com/150"} alt={modalContent.patients[index].name} style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} />
                      {modalContent.patients[index].name}
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
