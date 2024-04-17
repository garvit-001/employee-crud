import React, { useContext, useState } from "react";
import "./Utils/Utils.css";
import Home from "./Home";
import {useNavigate} from "react-router-dom";
import EmployeeContext from "../context/EmployeeContext";

const AddEmployee = () => {
  const context = useContext(EmployeeContext);
  const { addEmployee } = context;

  const [credentials, setCredentials] = useState({
    first: "",
    last: "",
    email: "",
    age: "",
    DOB: "",
    department: "Tech",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first, last, email, age, DOB, department } = credentials;

    // addEmployee(
    //   credentials.first,
    //   credentials.last,
    //   credentials.email,
    //   credentials.age,
    //   credentials.DOB,
    //   credentials.department
    // );
    // setCredentials({
    //   first: "",
    //   last: "",
    //   email: "",
    //   age: "",
    //   DOB: "",
    //   department: "Tech",
    // });

    // navigate("/employees");


    const response = await fetch("http://localhost:5000/api/employee/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        first,
        last,
        email,
        age,
        DOB,
        department,
      }),
    });
    const json = await response.json();
    console.log("succ", response);
    if (response.status == 200) {
      // Save the auth token and redirect
      navigate("/employees", { state: { json } });
    } else {
      alert("Invalid credentials");
    }

    // localStorage.setItem("authToken", json.user.id);

    // if (json.body.email === credentials.email) {
    //   // yha change kr lio bsnl
    //   // Save the auth token and redirect
    //   // localStorage.setItem("authToken", json.users._id);
    //   console.log(json.user.id);
    //   navigate("/employee");
    // } else {
    //   alert("Invalid credentials");
    //   console.log(json.users._id);
    // }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="home">
        <Home />
      </div>
      <div className="container">
        {/* <h1 className="m-2 text-center">SignUp Form</h1> */}
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="First"
              aria-describedby="emailHelp"
              placeholder="Enter first name"
              onChange={onChange}
              name="first"
              required={true}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last"
              aria-describedby="emailHelp"
              placeholder="Enter last Username"
              onChange={onChange}
              name="last"
              required={true}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email">Alternate Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={onChange}
              name="email"
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              placeholder="Age"
              name="age"
              onChange={onChange}
              required={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="DOB">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="DOB"
              name="DOB"
              ClassName="DOB"
              onChange={onChange}
              required={true}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="department">Select Department</label>
            <select onChange={onChange} name="department" id="department">
              <option selected={true} value="Tech">
                Tech
              </option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <button type="submit" className="my-3 btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
