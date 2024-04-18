import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
// import Home from "./components/Home";
// import { config } from './config';
import Employees from "./components/Employees";
import AddEmployee from "./components/AddEmployee";
import EmployeeState from "./context/EmployeeState";

function App() {
  // console.log(process.env.REACT_APP_NAME);
  console.log("name",import.meta.env.VITE_NAME);
  return (
    <EmployeeState>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/adduser" element={<AddEmployee />} />
          <Route exact path="/employees" element={<Employees />} />
          {/* <Route exact path="/home" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </EmployeeState>
  );
}

export default App;
