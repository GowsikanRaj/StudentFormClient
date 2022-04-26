import axios from "axios";
import React, { useState } from "react";
import Form from "./Form";

function App() {
  const [submission, setSubmission] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();

  const onFormSubmit = async (student) => {
    for (var i = 0; i < student.students.length; i++) {
      const selectedSubjects = student.students[i].studentSubjects.filter(
        (item) => item.isCheck === true
      );
      const nameOfSubjects = selectedSubjects.map((item) => item.name);
      const listOfSubjectsSelected = nameOfSubjects.join(", ");

      const nameOfDaysandTimes = student.students[i].studentDays
        .map((item) => item)
        .join(", ");

      await axios
        .post("https://arcane-savannah-35268.herokuapp.com/add-student", {
          FirstName: student.firstName,
          LastName: student.lastName,
          Address: student.address,
          City: student.city,
          Email: student.email,
          HomePhoneNumber: student.homePhoneNumber.replace(
            /^(\d{3})(\d{3})(\d{4}).*/,
            "($1)-$2-$3"
          ),
          CellPhoneNumber: student.cellPhoneNumber.replace(
            /^(\d{3})(\d{3})(\d{4}).*/,
            "($1)-$2-$3"
          ),
          EmergencyPhoneNumber: student.emergencyPhoneNumber.replace(
            /^(\d{3})(\d{3})(\d{4}).*/,
            "($1)-$2-$3"
          ),
          StudentFirstName: student.students[i].studentfirstname,
          StudentEmail: student.students[i].studentemail,
          StudentGrade: student.students[i].studentgrade,
          StudentSubjects: listOfSubjectsSelected,
          StudentDays: nameOfDaysandTimes,
          listOfDaysandTimesToDelete: student.students[i].studentDays,
          StartDate:
            months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear(),
        })
        .then(() => {
          setSubmission(true);
        })
        .catch((e) => {
          setSubmission(false);
        });
    }
  };

  return (
    <div className="ui container">
      <Form onFormSubmit={onFormSubmit} submission={submission} />
      {submission ? (
        <h3
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "green",
          }}
        >
          Your form was successfully submitted{" "}
        </h3>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
