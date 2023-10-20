import React from "react";

export default function Input({ value, name, placeholder, onChange }) {
  return (
    <>
      <input
        style={{ width: "100%", height: 35, padding: "0px px" }}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}
