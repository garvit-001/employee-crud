import React, { useState } from "react";
import "./Utils/Utils.css";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, username, cpassword } = credentials;
    // console.log(credentials);
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log("json", json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("authToken", json.authToken);
      navigate("/login");
    } else {
      alert("Invalid credentials");
    }

    // localStorage.setItem("authToken", json.authToken);
    // console.log()
    // if (json.name === credentials.name) {
    //   // yha change kr lio bsnl
    //   // Save the auth token and redirect
    //   // localStorage.setItem("authToken", json.user.id);
    //   console.log(json.users._id);
    //   navigate("/login");
    // } else {
    //   alert("Invalid credentials");
    //   // console.log(json.users._id);
    // }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="containers">
      <h1 className="text-center">SignUp Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="my3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            onChange={onChange}
            name="name"
          />
        </div>
        <div className="form-grp my3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter Username"
            onChange={onChange}
            name="username"
          />
        </div>
        <div className="form-grp my3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onChange={onChange}
            name="email"
          />
        </div>
        <div className="form-grp my3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            required={true}
            minLength={5}
          />
        </div>
        <div className="form-grp">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Confirm Password"
            name="cpassword"
            onChange={onChange}
            required={true}
            minLength={5}
          />
        </div>
        <button type="submit" className="my3">
          Submit
        </button>
        <p className="switch">
          already registered? click<Link to="/login">here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
