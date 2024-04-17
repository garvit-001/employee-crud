import React, { useState } from "react";
import "./Utils/Utils.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("Authorization", json.authToken);
      console.log("toke", json.authToken);
      console.log("auth", json.Authorization);
      navigate("/adduser");
    } else {
      alert("Invalid credentials");
    }
    if (response.status === 200) {
      // Save the auth token and redirect
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("Authorization", json.authToken);
      console.log("auth", json.Authorization);
      console.log("toke", json.authToken);
      alert("hogya login");
      navigate("/adduser");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="containers">
      <h1>LogIn Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb3">
          <label htmlFor="email" className="form-label">
            Email or Username
          </label>

          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Type here"
          />
        </div>
        <div className="mb3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            placeholder="Type here"
            id="password"
          />
        </div>

        <button type="submit">
          Submit
        </button>
        <p className="switch">
          New User? click<Link to="/">here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
