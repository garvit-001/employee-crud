import React, { useState } from "react";
import EmployeeContext from "./EmployeeContext";
// import dotenv from 'dotenv';

const EmployeeState = (props) => {
  // API CALL to fetch all Employee from backend
  dotenv.config();
  // console.log(process.env.REACT_APP_NAME);
  const host = "http://localhost:5000";
  const employeeOnitial = [];

  const [employee, setEmployee] = useState(employeeOnitial);
  // get all Employee
  const getEmployee = async () => {
    const url = `${host}/api/employee/fetchallemployees`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application-json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    // showing the changes in frontend
    const json = await response.json();
    // console.log(json);
    setEmployee(json);
  };

  // Add a Employee
  // const addEmployee = async (first, last, email, age, DOB, department) => {
  //   // API CALL to add Employee to backend
  //   console.log(first, last, email, age, DOB, department);
  //   const url = `${host}/api/employee/adduser`;
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authToken: localStorage.getItem("authToken"),
  //     },
  //     body: JSON.stringify({ first, last, email, age, DOB, department }),
  //   });

  //   const json = await response.json();
  //   // console.log(json);

  //   // showing the changes in frontend
  //   setEmployee(employee.concat(json));
  // };

  // Delete a Employee
  const deleteEmployee = async (id) => {
    // API CALL to delete from backend
    const url = `${host}/api/employee/deleteuser/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
    });
    const json = await response.json();
    console.log(json);

    // showing the changes in frontend
    let newemployee = employee.filter((Employee) => {
      return Employee._id !== id;
    });
    setEmployee(newemployee);
    // console.log("deleeting the Employee with id" + id);
  };

  // Edit a Employee
  const editEmployee = async (id, first, last, email, age, DOB, department) => {
    // API CALL to edit a Employee in backend also
    const url = `${host}/api/employee/updateuser/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ first, last, email, age, DOB, department }),
    });
    const json = await response.json();
    console.log(json);

    // showing the changes in frontend
    let newemployee = JSON.parse(JSON.stringify(employee));
    for (let index = 0; index < newemployee.length; index++) {
      const element = newemployee[index];
      if (element._id === id) {
        newemployee[index].first = first;
        newemployee[index].last = last;
        newemployee[index].email = email;
        newemployee[index].age = age;
        newemployee[index].DOB = DOB;
        newemployee[index].department = department;
        break;
      }
    }
    setEmployee(newemployee);
  };
  return (
    <EmployeeContext.Provider
      value={{
        employee,
        setEmployee,
        // addEmployee,
        deleteEmployee,
        editEmployee,
        getEmployee,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeState;
