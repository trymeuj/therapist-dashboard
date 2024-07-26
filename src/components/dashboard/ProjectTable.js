import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { assignBatch } from "../../database/methods";
import { set } from "firebase/database";

const ProjectTables = ({ data }) => {
  const {currentUser}=useAuth()
  const [batches, setBatches] = useState([]);
  const [batchDropdownOpen, setBatchDropdownOpen] = useState(Array(data.length).fill(false));
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(Array(data.length).fill(false));
  const [selectedBatch, setSelectedBatch] = useState(Array(data.length).fill("Select Batch"));
  useEffect(() => {
    
  let arr=Array(data.length).fill("Select Batch")
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(element.batch){
        arr[index]=element.batch
      }
      
    }
  setSelectedBatch(arr)
  setBatchDropdownOpen(Array(data.length).fill(false))

  
  }, [data])
  
  const [selectedTime, setSelectedTime] = useState(Array(data.length).fill("Select Time"));
  
  useEffect(
    ()=>{
      if(currentUser.batches){
        setBatches(currentUser.batches)
      }
    },[]
  )



  const toggleBatchDropdown = (index) => {
    const newArray = [...batchDropdownOpen];
    newArray[index] = !newArray[index];
    setBatchDropdownOpen(newArray);
  };

  const toggleTimeDropdown = (index) => {
    const newArray = [...timeDropdownOpen];
    newArray[index] = !newArray[index];
    setTimeDropdownOpen(newArray);
  };

  const handleBatchSelect = (index, option) => {
    const newArray = [...selectedBatch];
    newArray[index] = option;
    setSelectedBatch(newArray);
    assignBatch(data[index].uid, option);
  };

  const handleTimeSelect = (index, option) => {
    const newArray = [...selectedTime];
    newArray[index] = option;
    setSelectedTime(newArray);
  };

  const batchOptions = ["Batch 1 (MWF)", "Batch 2 (TTS)"];
  const timeOptions = ["8-9", "9-10", "10-11", "11-12"];

  return (
    <Card>
      <CardBody>
        <Table className="no-wrap mt-3 align-middle" responsive borderless>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Name</th>
              <th>Batch & Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.num}>
                <td>{index+1}</td>
                <td>
                  <Link to={`/userprofile/${item.uid}`}>{item.name}</Link>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Dropdown isOpen={batchDropdownOpen[index]} toggle={() => toggleBatchDropdown(index)}>
                      <DropdownToggle caret>
                        { selectedBatch[index]}
                      </DropdownToggle>
                      <DropdownMenu>
                      {Object.entries(batches).map(([key, value]) => (
        <DropdownItem key={key} onClick={() => {
          handleBatchSelect(index, key)
          }}>
          {key}
        </DropdownItem>
      ))}
                      </DropdownMenu>
                    </Dropdown>
                  
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ProjectTables;
