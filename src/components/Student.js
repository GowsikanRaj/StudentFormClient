import React, { Component } from "react";
import { Grades } from "../Lists";
import SubjectCheckbox from "./SubjectCheckbox";
import DayCheckbox from "./DayCheckbox";
import axios from "axios";
import "./Styling.css";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfDaysandTimes: [],
    };
  }

  async componentDidMount() {
    const { newStudent } = this.props;
    let updatedStudents = newStudent;

    const { data } = await axios.get(
      "https://arcane-savannah-35268.herokuapp.com/allDays"
    );

    data.forEach((element) => {
      element["isCheck"] = false;
    });

    updatedStudents["listOfDays"] = data;

    await axios
      .get("https://arcane-savannah-35268.herokuapp.com/allDaysandTimes")
      .then((response) => this.setState({ listOfDaysandTimes: response.data }));

    const item = updatedStudents["listOfDays"].map(
      (items) =>
        this.state.listOfDaysandTimes.filter(
          (item) => JSON.parse(JSON.stringify(item))["Days"] === items.Days
        )[0]["Times"]
    );

    updatedStudents["listOfTimesSelected"] = item;
  }

  handleCheckboxSubject = (subjectData) => {
    const { index, handlestudentcheckboxaction } = this.props;
    handlestudentcheckboxaction(subjectData, index, "studentSubjects");
  };

  handleCheckboxDay = (event, days) => {
    const { handlecheckboxday, index } = this.props;
    const { listOfDaysandTimes } = this.state;
    handlecheckboxday(listOfDaysandTimes, index, "studentDays", event, days);
  };

  handleTime = (event, days) => {
    const { handletime, index } = this.props;
    handletime(index, "studentDays", event, days);
  };

  render() {
    const {
      studentfirstname,
      studentemail,
      studentgrade,
      studentSubjects,
      listOfDays,
      listOfTimesSelected,
    } = this.props.newStudent;

    const { index, handlestudentaction, handledelete } = this.props;

    let subjectToShow = [];
    if (parseInt(studentgrade) >= 7 && parseInt(studentgrade) <= 10) {
      subjectToShow = studentSubjects.filter(
        (item) => item.gradeFilter === "7-10"
      );
    }
    if (studentgrade === "11") {
      subjectToShow = studentSubjects.filter(
        (item) => item.gradeFilter === "11"
      );
    }
    if (studentgrade === "12") {
      subjectToShow = studentSubjects.filter(
        (item) => item.gradeFilter === "12"
      );
    }

    return (
      <>
        <div className="field">
          <div className="fields">
            <div className="three wide field">
              <label className="ui header required-field">
                Student First Name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  handlestudentaction(e, index, "studentfirstname")
                }
                value={studentfirstname}
              />
            </div>
            <div className="three wide field">
              <label className="ui header required-field">Student Email</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => handlestudentaction(e, index, "studentemail")}
                value={studentemail}
              />
            </div>
            <div className="two wide field">
              <label
                className="ui header required-field"
                style={{ display: "flex", justifyContent: "center" }}
              >
                Grade
              </label>
              <select
                id="Grade"
                value={studentgrade}
                onChange={(e) => handlestudentaction(e, index, "studentgrade")}
                className={this.props.submission ? "" : "ui fluid dropdown"}
              >
                {Grades.map((grade) => (
                  <option key={grade.id} value={grade.name}>
                    {grade.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="three wide field">
              <label className="ui header required-field">Subject</label>
              {subjectToShow.map((subject) => (
                <SubjectCheckbox
                  key={subject.id}
                  subjectData={subject}
                  handleCheckboxSubject={this.handleCheckboxSubject}
                />
              ))}
            </div>
            <div className="five wide field">
              <label className="ui header required-field">
                Available Days and Times
              </label>
              {listOfDays.map((day, index) => (
                <DayCheckbox
                  key={index}
                  index={index}
                  days={day}
                  daysandtimes={this.state.listOfDaysandTimes.filter(
                    (item) =>
                      JSON.parse(JSON.stringify(item))["Days"] === day.Days
                  )}
                  initialTime={listOfTimesSelected[index]}
                  handleCheckboxDay={this.handleCheckboxDay}
                  handletime={this.handleTime}
                />
              ))}
            </div>
            <div className="one wide field">
              <button
                type="button"
                style={{ display: "flex", justifyContent: "flex-end" }}
                onClick={() => handledelete(this.props.index)}
              >
                <i className="trash alternate icon" /> Delete
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Student;
