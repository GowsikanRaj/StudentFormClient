import React from "react";

const SubjectCheckbox = ({ subjectData, handleCheckboxSubject }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContents: "center",
        alignItems: "center",
        height: "38px",
      }}
    >
      <ul
        style={{
          listStyleType: "none",
          display: "contents",
          justifyContent: "center",
        }}
      >
        <li
          style={{
            display: "contents",
            justifyContent: "center",
          }}
        >
          <input
            type="checkbox"
            id={subjectData.id}
            checked={subjectData.isCheck}
            value={subjectData.name}
            name={subjectData.name}
            onChange={() => handleCheckboxSubject(subjectData)}
          />
          <label style={{ marginLeft: "4px" }}> {subjectData.name} </label>
        </li>
      </ul>
    </div>
  );
};

export default SubjectCheckbox;
