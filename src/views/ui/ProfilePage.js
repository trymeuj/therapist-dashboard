import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Button, Col, Row, Table, Card, CardTitle, CardBody, Spinner } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import userpic from "./my_pic.jpg";
import { getPatientById } from "../../database/methods";
import { set } from "firebase/database";

const ProfilePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState({});
  useEffect(() => {
    const fetchPatient = async () => {
      let p=  await getPatientById(id)
      setPatient(p);
      setLoading(false);
    }
    fetchPatient();
  }, []);
  const [showHomeworkTable, setShowHomeworkTable] = useState(false);
  const [showReportTables, setShowReportTables] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);
  const navigate = useNavigate();

  const [homeworkData, setHomeworkData] = useState([]);
  const [addMoreData, setAddMoreData] = useState([
    { id: 4, firstName: "John", lastName: "Doe", username: "@jdoe" },
    { id: 5, firstName: "Jane", lastName: "Smith", username: "@jsmith" },
    { id: 6, firstName: "Bob", lastName: "Johnson", username: "@bjohnson" },
  ]);

  // useEffect(() => {
  //   fetchHomeworkData();
  // }, []);

  const fetchHomeworkData = async () => {
    const sheetId = "1R1JKBYO9rSCn-2fNTdXPYe2_MNhNCc6Jhj6rDhE5az8";
    const range = "Sheet1!A:D"; // Update this range according to your sheet
    const apiKey = "AIzaSyCrR-qlvOOe-DcanFN1rxMIvNAteyo0bZ8";

    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
      );
      const data = response.data.values;
      const formattedData = data.slice(1).map((row, index) => ({
        id: index + 1,
        firstName: row[2],
        lastName: row[0],
        username: row[3],
      }));
      setHomeworkData(formattedData);
    } catch (error) {
      console.error("Error fetching homework data:", error);
    }
  };

  const toggleHomeworkTable = () => {
    setShowHomeworkTable(!showHomeworkTable);
    setShowReportTables(false);
  };

  const toggleReportTables = () => {
    setShowReportTables(!showReportTables);
    setShowHomeworkTable(false);
  };

  const handleFeeDetailsClick = () => {
    navigate("/feedetail");
  };

  const addToHomework = (item) => {
    setHomeworkData([...homeworkData, item]);
  };

  const toggleFullProfile = () => {
    setShowFullProfile(!showFullProfile);
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      {loading?
      <Spinner color="primary"/>
      : <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={patient.profile ?patient.profile: "/user.avif"}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">{patient.name}</p>
                <p className="text-muted mb-4">{patient.address}</p>
                <div className="d-flex justify-content-center mb-2">
                  <Button color="primary" style={{ marginTop: "20px" }} onClick={toggleFullProfile}>
                    {showFullProfile ? "Hide Profile" : "See full Profile"}
                  </Button>
                </div>
                {showFullProfile && (
                  <div className="mt-4">
                    <MDBCardText><strong>Started Therapy: </strong>{patient.doj}</MDBCardText>
                    <MDBCardText><strong>Date of Birth: </strong> {patient.dob}</MDBCardText>
                    <MDBCardText><strong>Parents' Names: </strong> {patient.parentNames}</MDBCardText>
                    <MDBCardText><strong>Parents' Phone Number: </strong>{patient.parentPhone}</MDBCardText>
                    <MDBCardText><strong>Address: </strong>{patient.address}</MDBCardText>
                    <MDBCardText><strong>Remarks: </strong>{patient.remarks}</MDBCardText>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBRow>
              <MDBCol md="6">
                <MDBCard
                  className="mb-4 mb-md-0"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  <MDBCardBody>
                    <div style={{ fontSize: "3rem", fontWeight: "bold" }}>
                      75%
                    </div>
                    <MDBCardText
                      className="mb-2"
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                    >
                      Patient Status
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard
                  className="mb-4 mb-md-0"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    border: "1px solid #dcdcdc",
                    borderRadius: "10px",
                  }}
                >
                  <MDBCardBody>
                    <div
                      style={{
                        fontSize: "3rem",
                        fontWeight: "bold",
                        color: "#4caf50",
                      }}
                    >
                      31
                    </div>
                    <MDBCardText
                      className="mb-2"
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                    >
                      Number of Weeks
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>

        <Card className="mb-4">
          <CardBody>
            <Button
              className="btn"
              outline
              color="danger"
              onClick={toggleHomeworkTable}
            >
              Assign Homework
            </Button>
            <Button
              className="btn"
              outline
              color="danger"
              onClick={toggleReportTables}
            >
              See Report
            </Button>
            <Button
              className="btn"
              outline
              color="danger"
              onClick={handleFeeDetailsClick}
            >
              Fee Details
            </Button>
          </CardBody>
        </Card>

        {showHomeworkTable && (
          <>
            <Col lg="12" className="mb-4">
              <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                  <i className="bi bi-card-text me-2"> </i>
                  Today's Homework
                </CardTitle>
                <CardBody>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>Description</th>
                        <th>Exercise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {homeworkData.map((item, index) => (
                        <tr key={item.id}>
                          <th >{item.lastName}</th>
                          <td>{item.firstName}</td>
                          <td>{item.username}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            <Col lg="12" className="mb-4">
              <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                  <i className="bi bi-card-text me-2"> </i>
                  Add More Homework
                </CardTitle>
                <CardBody>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>Description</th>
                        <th>Exercise</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addMoreData.map((item, index) => (
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.firstName}</td>
                          <td>{item.username}
                          <br></br>
                          <Button color="primary">Add Exercise</Button> 
                          </td>
                          <td>
                            <Button
                              color="success"
                              onClick={() => addToHomework(item)}
                            >
                              Add to Homework
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </>
        )}

        {showReportTables && (
          <>
            <Col lg="12" className="mb-4">
              <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                  <i className="bi bi-card-text me-2"> </i>
                  Patient needs to work on
                </CardTitle>
                <CardBody>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>Description</th>
                        <th>Exercise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addMoreData.map((item, index) => (
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.firstName}</td>
                          <td>{item.username}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            <Col lg="12" className="mb-4">
              <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                  <i className="bi bi-card-text me-2"> </i>
                  Patient does fine with
                </CardTitle>
                <CardBody>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>Description</th>
                        <th>Exercise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addMoreData.map((item, index) => (
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.firstName}</td>
                          <td>{item.username}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col lg="12" className="mb-4">
              <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                  <i className="bi bi-card-text me-2"> </i>
                  Patient does excellent with
                </CardTitle>
                <CardBody>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>Description</th>
                        <th>Exercise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addMoreData.map((item, index) => (
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.firstName}</td>
                          <td>{item.username}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </>
        )}
        
        <Col lg="12" className="mb-4">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-card-text me-2"> </i>
              History
            </CardTitle>
            <CardBody>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Description</th>
                    <th>Remark</th>
                    <th>Date Completed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>John</td>
                    <td>Doe</td>
                    <td>@jdoe</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jane</td>
                    <td>Smith</td>
                    <td>@jsmith</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Bob</td>
                    <td>Johnson</td>
                    <td>@bjohnson</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </MDBContainer>}
    </section>
  );
};

export default ProfilePage;
