import React from "react";

const InputField = ({ label, type, id, placeholder, name, value, onChange, required }) => {
  return (
    <div className="form-group my-3">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
