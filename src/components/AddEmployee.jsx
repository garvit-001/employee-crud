import React, { useContext, useState } from "react";
import "./Utils/Utils.css";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import callApi from "../services/apiService";
import InputField from "./Utils/InputField";
import { constant } from "./Utils/Constants";

const AddEmployee = () => {
  const [credentials, setCredentials] = useState(constant);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await callApi("/employee/adduser", "POST", credentials);
      console.log(response);
      const json = await response.json();
      console.log("succ", response);
      if (response.status == 200) {
        // Save the auth token and redirect
        navigate("/employees", { state: { json } });
      } else {
        alert("Invalid credentials");
      }
      // Handle success
    } catch (error) {
      console.error(error.message);
      // Handle error
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
          <InputField
        label="First Name"
        type="text"
        id="First"
        placeholder="Enter first name"
        name="first"
        value={credentials.first}
        onChange={onChange}
        required={true}
      />
      <InputField
        label="Last Name"
        type="text"
        id="last"
        placeholder="Enter last name"
        name="last"
        value={credentials.last}
        onChange={onChange}
        required={true}
      />
      <InputField
        label="Alternate Email"
        type="email"
        id="email"
        placeholder="Enter email"
        name="email"
        value={credentials.email}
        onChange={onChange}
        required={true}
      />
      <InputField
        label="Age"
        type="number"
        id="age"
        placeholder="Age"
        name="age"
        value={credentials.age}
        onChange={onChange}
        required={true}
      />
      <InputField
        label="Date of Birth"
        type="date"
        id="DOB"
        name="DOB"
        placeholder="Date of Birth"
        value={credentials.DOB}
        onChange={onChange}
        required={true}
      />
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
