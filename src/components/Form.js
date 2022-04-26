import React, { Component } from "react";
import Student from "./Student";
import "./Styling.css";

const rx_phoneNumber = /^[0-9]*$/i;
const rx_string = /^[a-zA-Z]*$/i;
const rx_address = /^[a-zA-Z0-9 ]*$/i;
const rx_email = /^[a-zA-Z0-9@_.-]*$/i;
const rx_emailTester = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

class Form extends Component {
  newStudent = {
    studentfirstname: "",
    studentemail: "",
    studentgrade: "7",
    studentSubjects: [
      { name: "Math", id: "math1", isCheck: false, gradeFilter: "7-10" },
      { name: "Science", id: "science", isCheck: false, gradeFilter: "7-10" },
      { name: "Math", id: "math2", isCheck: false, gradeFilter: "11" },
      {
        name: "Chemistry",
        id: "chemistry1",
        isCheck: false,
        gradeFilter: "11",
      },
      { name: "Physics", id: "physics1", isCheck: false, gradeFilter: "11" },
      {
        name: "Advanced Functions",
        id: "advancedfunctions",
        isCheck: false,
        gradeFilter: "12",
      },
      { name: "Calculus", id: "calculus", isCheck: false, gradeFilter: "12" },
      {
        name: "Data Management",
        id: "datamanagement",
        isCheck: false,
        gradeFilter: "12",
      },
      {
        name: "Chemistry",
        id: "chemistry2",
        isCheck: false,
        gradeFilter: "12",
      },
      { name: "Physics", id: "physics2", isCheck: false, gradeFilter: "12" },
    ],
    studentDays: [],
    listOfDays: [],
    listOfTimesSelected: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      email: "",
      homePhoneNumber: "",
      cellPhoneNumber: "",
      emergencyPhoneNumber: "",
      students: [JSON.parse(JSON.stringify(this.newStudent))],
      isDisabled: true,
      errorMessage: "",
    };
  }

  handleString = (event, action) => {
    if (rx_string.test(event.target.value)) {
      this.setState({ [action]: event.target.value });
    }
  };

  handleEmail = (event, action) => {
    if (rx_email.test(event.target.value)) {
      this.setState({ [action]: event.target.value });
    }
  };

  handleAddress = (event, action) => {
    if (rx_address.test(event.target.value)) {
      this.setState({ [action]: event.target.value });
    }
  };

  handlePhoneNumber = (event, action) => {
    if (rx_phoneNumber.test(event.target.value))
      this.setState({ [action]: event.target.value });
  };

  handleStudentAction = (event, id, action) => {
    const { students } = this.state;
    let studentBeingUpdated = students;
    if (action === "studentfirstname") {
      if (rx_string.test(event.target.value)) {
        studentBeingUpdated[id][action] = event.target.value;
      }
    }
    if (action === "studentemail") {
      if (rx_email.test(event.target.value)) {
        studentBeingUpdated[id][action] = event.target.value;
      }
    }
    if (action === "studentgrade") {
      studentBeingUpdated[id][action] = event.target.value;
    }

    this.setState({
      students: studentBeingUpdated,
    });
  };

  handleStudentCheckboxAction = (event, id, action) => {
    const { students } = this.state;
    let studentBeingUpdated = students;
    const Id = studentBeingUpdated[id][action].findIndex(
      (e) => e.id === event.id
    );
    let newArr = studentBeingUpdated[id][action];
    newArr[Id].isCheck = !newArr[Id].isCheck;
    studentBeingUpdated[id][action] = newArr;
    this.setState({
      students: studentBeingUpdated,
    });
  };

  handleCheckBoxDay = (listOfDaysandTimes, index, action, event, days) => {
    const { students } = this.state;

    let studentBeingUpdated = students;
    let updatedDaysandTimes = studentBeingUpdated[index][action];

    const day = studentBeingUpdated[index]["listOfDays"].map(
      (items) =>
        listOfDaysandTimes.filter(
          (item) => JSON.parse(JSON.stringify(item))["Days"] === items.Days
        )[0]["Times"]
    );

    const DayId = studentBeingUpdated[index]["listOfDays"]
      .map((item) => item.Days)
      .indexOf(days.Days);

    const checker = updatedDaysandTimes.map(
      (item) => item.split(": ")[0] === event.target.value
    );

    if (!checker.includes(true)) {
      updatedDaysandTimes.push(event.target.value + ": " + day[DayId]);
    } else {
      const indices = updatedDaysandTimes.findIndex(
        (day) => day.split(": ")[0] === event.target.value
      );
      if (indices > -1) {
        updatedDaysandTimes.splice(indices, 1);
      }
    }

    studentBeingUpdated[index][action] = updatedDaysandTimes;

    const Id = studentBeingUpdated[index]["listOfDays"].findIndex(
      (item) => item.Days === days.Days
    );
    let newArr = studentBeingUpdated[index]["listOfDays"];
    newArr[Id].isCheck = !newArr[Id].isCheck;
    studentBeingUpdated[index]["listOfDays"] = newArr;

    this.setState({
      students: studentBeingUpdated,
    });
  };

  handleTime = (index, action, event, days) => {
    const { students } = this.state;
    let studentBeingUpdated = students;

    const selectedDayIndex = studentBeingUpdated[index][action].findIndex(
      (day) => day.split(": ")[0] === days.Days
    );

    studentBeingUpdated[index][action][selectedDayIndex] =
      days.Days + ": " + event.target.value;

    const dayIndex = studentBeingUpdated[index]["listOfDays"].findIndex(
      (day) => day.Days === days.Days
    );

    studentBeingUpdated[index]["listOfTimesSelected"][dayIndex] =
      event.target.value;

    this.setState({
      students: studentBeingUpdated,
    });
  };

  addStudent = () => {
    const { students } = this.state;
    let updatedStudents = students;
    updatedStudents.push(JSON.parse(JSON.stringify(this.newStudent)));
    this.setState({
      students: updatedStudents,
    });
  };

  deleteStudent = (id) => {
    const { students } = this.state;
    let filteredStudents = students;
    filteredStudents.splice(id, 1);
    this.setState({
      students: filteredStudents,
    });
  };

  checkValidStudentEmails = (students) => {
    let valid = [false];
    students.forEach((item, index) => {
      console.log(item);
      if (!rx_emailTester.test(item.studentemail)) {
        valid[0] = true;
        valid = [...valid, index + 1];
      }
    });
    return valid;
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const valid = this.checkValidStudentEmails(this.state.students);
    console.log(valid);
    if (!rx_emailTester.test(this.state.email)) {
      this.setState({
        errorMessage: " Please enter a valid parent email",
      });
    } else if (valid[0]) {
      let temp = "";
      for (let i = 1; i < valid.length; i++) {
        temp += "Please enter a valid student " + valid[i] + " email \n\n";
      }
      this.setState({ errorMessage: temp });
    } else {
      await this.props.onFormSubmit(this.state);
      this.setState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
        homePhoneNumber: "",
        cellPhoneNumber: "",
        emergencyPhoneNumber: "",
        students: [JSON.parse(JSON.stringify(this.newStudent))],
        isDisabled: true,
        errorMessage: "",
      });
    }
  };

  render() {
    const { students } = this.state;
    return (
      <div
        className=""
        style={{
          margin: "20px",
          padding: "10px",
        }}
      >
        <div className="field">
          <div className="fields">
            {/* <img
              src={process.env.PUBLIC_URL + "/excellentacademy.png"}
              alt="excellent"
              style={{ width: "200px" }}
            /> */}
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Student Registration Form
            </h1>
          </div>
        </div>
        <hr />
        <form
          className="ui form"
          autoComplete="off"
          onSubmit={this.onFormSubmit}
        >
          <div className="field">
            <div className="fields">
              <div className="four wide field">
                <label className="ui header required-field">
                  Parent's First Name
                </label>
                <input
                  type="text"
                  required="required"
                  onChange={(e) => this.handleString(e, "firstName")}
                  value={this.state.firstName}
                />
              </div>
              <div className="four wide field">
                <label className="ui header required-field">
                  Parent's Last Name
                </label>
                <input
                  type="text"
                  required="required"
                  onChange={(e) => this.handleString(e, "lastName")}
                  value={this.state.lastName}
                />
              </div>
              <div className="four wide field">
                <label className="ui header required-field">Address</label>
                <input
                  type="text"
                  required="required"
                  className="form-control"
                  onChange={(e) => this.handleAddress(e, "address")}
                  value={this.state.address}
                />
              </div>
              <div className="four wide field">
                <label className="ui header required-field">City</label>
                <input
                  type="text"
                  required="required"
                  className="form-control"
                  onChange={(e) => this.handleString(e, "city")}
                  value={this.state.city}
                />
              </div>
            </div>
          </div>
          <br></br>
          <div className="field">
            <div className="fields">
              <div className="four wide field">
                <label className="ui header required-field">
                  Email Address
                </label>
                <input
                  type="text"
                  required="required"
                  onChange={(e) => this.handleEmail(e, "email")}
                  value={this.state.email}
                />
              </div>
              <div className="four wide field">
                <label className="ui header required-field">
                  Home Phone Number
                </label>
                <input
                  type="text"
                  minLength={10}
                  maxLength={10}
                  required="required"
                  onChange={(e) => this.handlePhoneNumber(e, "homePhoneNumber")}
                  value={this.state.homePhoneNumber}
                />
              </div>
              <div className="four wide field">
                <label className="ui header required-field">
                  Cell Phone Number
                </label>
                <input
                  type="text"
                  required="required"
                  minLength={10}
                  maxLength={10}
                  className="form-control"
                  onChange={(e) => this.handlePhoneNumber(e, "cellPhoneNumber")}
                  value={this.state.cellPhoneNumber}
                />
              </div>
              <div className="four wide field">
                <label className="ui header required-field">
                  Emergency Phone Number
                </label>
                <input
                  type="text"
                  required="required"
                  minLength={10}
                  maxLength={10}
                  className="form-control"
                  onChange={(e) =>
                    this.handlePhoneNumber(e, "emergencyPhoneNumber")
                  }
                  value={this.state.emergencyPhoneNumber}
                />
              </div>
            </div>
          </div>
          <br />
          {students.map((student, index) => (
            <Student
              key={index}
              index={index}
              newStudent={students[index]}
              submission={this.props.submission}
              handlestudentaction={this.handleStudentAction}
              handlestudentcheckboxaction={this.handleStudentCheckboxAction}
              handlecheckboxday={this.handleCheckBoxDay}
              handletime={this.handleTime}
              handledelete={this.deleteStudent}
              onStudentSave={this.onStudentSave}
            />
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={this.addStudent}
              className="ui button"
            >
              <i className="plus circle icon" style={{ marginRight: "5px" }} />{" "}
              Add student
            </button>
          </div>
          <br></br>
          <h3 style={{ color: "red" }}>{this.state.errorMessage}</h3>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="ui button">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
