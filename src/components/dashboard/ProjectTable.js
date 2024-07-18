import React, { useState } from "react";
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

const ProjectTables = ({ data }) => {
  const [batchDropdownOpen, setBatchDropdownOpen] = useState(Array(data.length).fill(false));
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(Array(data.length).fill(false));
  const [selectedBatch, setSelectedBatch] = useState(Array(data.length).fill("Select Batch"));
  const [selectedTime, setSelectedTime] = useState(Array(data.length).fill("Select Time"));

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
                <td>{item.num}</td>
                <td>
                  <Link to={`/userprofile`}>{item.name}</Link>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Dropdown isOpen={batchDropdownOpen[index]} toggle={() => toggleBatchDropdown(index)}>
                      <DropdownToggle caret>
                        {selectedBatch[index]}
                      </DropdownToggle>
                      <DropdownMenu>
                        {batchOptions.map((option, idx) => (
                          <DropdownItem key={idx} onClick={() => handleBatchSelect(index, option)}>
                            {option}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown isOpen={timeDropdownOpen[index]} toggle={() => toggleTimeDropdown(index)} className="ml-2">
                      <DropdownToggle caret>
                        {selectedTime[index]}
                      </DropdownToggle>
                      <DropdownMenu>
                        {timeOptions.map((option, idx) => (
                          <DropdownItem key={idx} onClick={() => handleTimeSelect(index, option)}>
                            {option}
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
