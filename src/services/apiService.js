const BASE_URL = import.meta.env.VITE_BASE_URL;

export const callApi = (endpoint, method = "GET", data = null) => {
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

  return fetch(`${BASE_URL}${endpoint}`, config)
    .then((response) => response.json())
    .then((responseData) => {
      if (!response.ok) {
        throw new Error(responseData.error || "Something went wrong");
      }
      return responseData;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const getEmployees = () => {
  return callApi("/api/employee/fetchallemployees", "GET")
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const deleteEmp = (id) => {
  return callApi(`/api/employee/deleteuser/${id}`, "DELETE")
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const editEmp = (id, first, last, email, age, DOB, department) => {
  const requestData = { first, last, email, age, DOB, department };
  return callApi(`/api/employee/updateuser/${id}`, "PUT", requestData)
    .then((response) => response)
    .catch((error) => {
      throw new Error(error.message);
    });
};
