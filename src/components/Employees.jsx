import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import AddEmployee from "./AddEmployee";
import "../components/Utils/Utils.css";
import EmployeeContext from "../context/EmployeeContext";
import EmployeeItem from "./EmployeeItem";
import InputField from "./Utils/InputField";
import { constant } from "./Utils/Constants";

const Employees = () => {
  const context = useContext(EmployeeContext);
  const { employee, getEmployee, editEmployee } = context;
  const [emp, setEmp] = useState({
    constant,
    id: "",
  });
  console.log(
    "got the constant",
    constant.DOB,
    constant.first,
    constant.department
  );
  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      console.log("getemloyee called");
      getEmployee();
      console.log(emp);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateEmployee = (currNote) => {
    ref.current.click();
    setEmp({
      id: currNote._id,
      efirst: currNote.first,
      elast: currNote.last,
      eDOB: currNote.DOB,
      eemail: currNote.email,
      eage: currNote.age,
      edepartment: currNote.department,
    });
    console.log("setted data", constant);
  };

  const handleClick = (e) => {
    e.preventDefault();
    editEmployee(
      emp.id,
      emp.constant.first,
      emp.constant.last,
      emp.constant.email,
      emp.constant.age,
      emp.constant.DOB,
      emp.constant.department
    );
    refClose.current.click();
    setEmp(constant);
  };
  const onChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* <AddEmployee /> */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <InputField
                  label="First"
                  type="text"
                  id="efirst"
                  name="efirst"
                  value={emp.constant.first}
                  onChange={onChange}
                  required={true}
                  minLength={5}
                />
                <InputField
                  label="Last"
                  type="text"
                  id="elast"
                  name="elast"
                  value={emp.constant.last}
                  onChange={onChange}
                  required={true}
                  minLength={5}
                />
                <InputField
                  label="Age"
                  type="text"
                  id="eage"
                  name="eage"
                  value={emp.constant.age}
                  onChange={onChange}
                  required={true}
                  minLength={5}
                />
                <InputField
                  label="Email"
                  type="text"
                  id="eemail"
                  name="eemail"
                  value={emp.constant.email}
                  onChange={onChange}
                  required={true}
                  minLength={5}
                />
                <InputField
                  label="DOB"
                  type="text"
                  id="eDOB"
                  name="eDOB"
                  value={emp.constant.DOB}
                  onChange={onChange}
                  required={true}
                  minLength={5}
                />
                <div className="mb-3">
                  <label htmlFor="edepartment" className="form-label">
                    department
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edepartment"
                    name="edepartment"
                    value={emp.constant.department}
                    onChange={onChange}
                    required={true}
                    minLength={5}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
                // disabled={
                //   emp.elast.length < 5 || emp.eemail.length < 5
                // }
              >
                Update Employee
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-3">
        {employee.length === 0
          ? "Nothing to display"
          : employee.map((employee) => {
              return (
                <EmployeeItem
                  employee={employee}
                  updateEmployee={updateEmployee}
                  key={employee._id}
                />
              );
            })}
      </div>
    </>
  );
};

export default Employees;
