import React, { useState, useEffect } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteStudent, getSchoolData } from "./ApiServices";
export function StudentList(){
  const [data, setData] = useState([]);
  const isLoggedin = useSelector((state) => state.schoolData.isLogeddin);
  const objId =useSelector((state) => state.schoolData.objId);
  const navigate = useNavigate();
  console.log(objId);
  const handleFetchData = async () => {
    try {
      const response = await getSchoolData();
      setData(response.data[0].students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleDelete=async (id)=>{
    
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if(shouldDelete){
          try 
          {
              await  deleteStudent(objId,id);   
              alert("Student Remove")
              handleFetchData();
          } 
          catch (error)
           {
             console.log(error);
              alert("Network Problem Try Letter..")
          }
    }
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={2}></Col>
        <Col lg={8}>
          {isLoggedin ? (
            <>
              <Alert className="text-center">
                <h3>Student List</h3>
              </Alert>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{ fontSize: "large", color: "black", fontWeight: "bold" }}>S.N</TableCell>
                      <TableCell align="center" style={{ fontSize: "large", color: "black", fontWeight: "bold" }}>Name</TableCell>
                      <TableCell align="center" style={{ fontSize: "large", color: "black", fontWeight: "bold" }}>Roll Number</TableCell>
                      <TableCell align="center" style={{ fontSize: "large", color: "black", fontWeight: "bold" }}>Section</TableCell>
                      <TableCell align="center" style={{ fontSize: "large", color: "black", fontWeight: "bold" }}>Class</TableCell>
                      <TableCell align="center" style={{ fontSize: "large", color: "black", fontWeight: "bold" }}>Number</TableCell>
                      <TableCell align="center" style={{ fontSize: "large", color: "black", fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((student, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center" style={{ fontSize: "16px", color: "black" }}>{index + 1}</TableCell>
                        <TableCell align="center" style={{ fontSize: "16px", color: "black" }}>{student.name}</TableCell>
                        <TableCell align="center" style={{ fontSize: "16px", color: "black" }}>{student.rollnumber}</TableCell>
                        <TableCell align="center" style={{ fontSize: "16px", color: "black" }}>{student.section}</TableCell>
                        <TableCell align="center" style={{ fontSize: "16px", color: "black" }}>{student.class}</TableCell>
                        <TableCell align="center" style={{ fontSize: "16px", color: "black" }}>{student.number}</TableCell>
                        <TableCell align="center">
                          <Button  style={{backgroundColor:"red",color:"white"}} onClick={() => handleDelete(student._id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <div className="mt-5">
              <h4 className="text-center mt-5">Please Login</h4>
              <div className="text-center">
                <Button variant="outlined" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </div>
            </div>
          )}
        </Col>
        <Col lg={2}></Col>
      </Row>
    </Container>
  );
};


