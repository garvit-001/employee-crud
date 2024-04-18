const BASE_URL = "http://localhost:5000";

const callApi = async (endpoint, method = "GET", data = null) => {
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      // Add authorization token if available
      ...(localStorage.getItem("authToken") && {
        authToken: localStorage.getItem("authToken"),
      }),
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || "Something went wrong");
    }

    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default callApi;

export const getEmployees = async () => {
  try {
    const response = await callApi("/api/employee/fetchallemployees", "GET");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteEmp = async (id) => {
  try {
    const response = await callApi(`/api/employee/deleteuser/${id}`, "DELETE");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editEmp = async (id, first, last, email, age, DOB, department) => {
  try {
    const response = await callApi(`/api/employee/updateuser/${id}`, "PUT", {
      first,
      last,
      email,
      age,
      DOB,
      department,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
