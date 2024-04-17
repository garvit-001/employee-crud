import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../components/Utils/Utils.css";
import EmployeeContext from "../context/EmployeeContext";

const EmployeeItem = (props) => {
  const context = useContext(EmployeeContext);
  const { deleteEmployee } = context;
  const { employee, updateEmployee } = props;

  return (
    <div className="col m-3">
      <div style={{ width: "28rem" }}>
        <div>
          <table style={{ width: "100%" }}>
            <tr>
              <td>{employee.first}</td>
              <td>{employee.last}</td>
              <td>{employee.email}</td>
              <td>{employee.age}</td>
              <td>{employee.DOB}</td>
              <td>{employee.department}</td>
              <td>
                <FontAwesomeIcon
                  icon={faFilePen}
                  className="edit-icon"
                  onClick={() => updateEmployee(employee)}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete-icon"
                  onClick={() => deleteEmployee(employee._id)}
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeItem;
