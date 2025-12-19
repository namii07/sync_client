import React from "react";

const InputField = ({ label, value, onChange, type = "text", placeholder }) => {
  return (
    <div className="flex flex-col mb-3">
      {label && <label className="mb-1 text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lavender"
      />
    </div>
  );
};

export default InputField;
