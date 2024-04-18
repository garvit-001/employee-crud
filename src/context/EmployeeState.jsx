import React, { useState } from "react";
import EmployeeContext from "./EmployeeContext";
import { getEmployees, editEmp, deleteEmp } from "../services/apiService";

const EmployeeState = (props) => {
  // API CALL to fetch all Employee from backend
  // dotenv.config();
  // console.log(process.env.REACT_APP_NAME);
  
  const employeeOnitial = [];
  const [employee, setEmployee] = useState(employeeOnitial);

  // get all Employee
  const getEmployee = async () => {
    try {
      const response = await getEmployees();
      setEmployee(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Delete a Employee
  const deleteEmployee = async (id) => {
    // API CALL to delete from backend
    try {
      await deleteEmp(id);
      setEmployee(employee.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  // Edit a Employee
  const editEmployee = async (id, first, last, email, age, DOB, department) => {
    // API CALL to edit a Employee in backend also
    try {
      await editEmp(id, first, last, email, age, DOB, department);
      // Handle success, maybe show a message or update the UI
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employee,
        setEmployee,
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
