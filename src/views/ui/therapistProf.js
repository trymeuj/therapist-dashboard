

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  CardTitle,
  CardText,
  Spinner,
} from "reactstrap";
import ProjectTables from "../../components/dashboard/ProjectTable";
import { useAuth } from "../../AuthContext";
import { findTherapistById, getPatientsByIds } from "../../database/methods";
import { useParams } from "react-router-dom";

const GeneralTherapistProfile = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [profileData,setTherapist]=useState({})
    useEffect(() => {
      const fetchTherapist = async () => {
        let p=  await findTherapistById(id)
        setTherapist(p);
        setLoading(false);
      }
      fetchTherapist();
    }, []);

  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const {currentUser}=useAuth()
  const [patients,setPatients]=useState([])
  useEffect(()=>{
    const getdata=async()=>{
      if(profileData.patients){
      const p=await getPatientsByIds(profileData.patients)
      
      setPatients(p)
      }
    }
    getdata()
  },[profileData])

//   useEffect(()=>{
//     const getdata=async()=>{
//       if(currentUser.patients){
//       const p=await getPatientsByIds(currentUser.patients)
      
//       setPatients(p)
//       }
//     }
//     getdata()
//   },[])
//   useEffect(()=>{
//     setTherapist({...currentUser,image:"https://via.placeholder.com/150"})
//   },[])
  
  const toggleDetails = () => {
    setShowMoreDetails(!showMoreDetails);
  };

  // Dummy data
  // const profileData = {
  //   image: "https://via.placeholder.com/150",
  //   name: "John Doe",
  //   phoneNumber: "123-456-7890",
  //   gender: "Male",
  //   city: "San Francisco",
  //   registrationNumber: "12345",
  //   therapyCenter: "XYZ Therapy Center",
  //   numPatients: 50,
  //   additionalInfo: {
  //     registrationYear: "2010",
  //     qualification: "MD",
  //     college: "ABC Medical College",
  //     experience: "10 years",
  //   },
  // };

  // Dummy patient data
  // const patients = [
  //   { num: 1, name: "Rohan", batch: "MWF", time: "8-9" },
  //   { num: 2, name: "Sohan", batch: "TTS", time: "9-10" },
  //   { num: 3, name: "Mohan", batch: "MWF", time: "10-11" },
  //   // Add more patients as needed
  // ];

  return (
    <Container>
     {loading?<Spinner/>: <Row className="justify-content-center">
        <Col md="8">
          <Row className="align-items-center mb-4">
            <Col md="4" className="text-center">
              <div style={{ position: "sticky", top: "20px" }}>
                <img
                  src={profileData.profile?profileData.profile:"/user.avif"}
                  alt="Profile"
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col md="8">
              <div className="d-flex justify-content-between align-items-start">
                <CardTitle tag="h4">Therapist Profile</CardTitle>
                <Button color="primary">See Schedule</Button>
              </div>
              <CardText>Name: {profileData.name}</CardText>
              <CardText>Phone Number: {profileData.phone}</CardText>
              <CardText>Gender: {profileData.gender}</CardText>
              <CardText>City: {profileData.city}</CardText>
              <CardText>
                Registration Number: {profileData.registration_No}
              </CardText>
              <CardText>
                Therapy Center: {profileData.therapy_center}
              </CardText>
              <CardText>
                Number of Patients: {profileData.patients? profileData.patients.length:0}
              </CardText>
              <Button color="primary" onClick={toggleDetails}>
                {showMoreDetails ? "Hide Details" : "See More Details"}
              </Button>
              {showMoreDetails && (
                <div className="mt-4">
                  <CardTitle tag="h5">Additional Information</CardTitle>
                  <CardText>
                    Registration Year: {profileData.registration_year}
                  </CardText>
                  <CardText>
                    Qualification: {profileData.qualification}
                  </CardText>
                  <CardText>
                    College: {profileData.college}
                  </CardText>
                  <CardText>
                    Experience: {profileData.experience}
                  </CardText>
                </div>
              )}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <CardTitle tag="h5">Patient Details</CardTitle>
              <div >
                <ProjectTables data={patients} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>}
    </Container>
  );
};

export default GeneralTherapistProfile;
