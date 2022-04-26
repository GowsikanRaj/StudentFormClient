import React, { Component } from "react";

class DayCheckBox extends Component {
  render() {
    const {
      index,
      days,
      daysandtimes,
      handleCheckboxDay,
      initialTime,
      handletime,
    } = this.props;

    return (
      <>
        <div className="fields">
          <div
            className="eight wide field"
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
                  value={days.Days}
                  checked={days.isCheck}
                  onChange={(e) => handleCheckboxDay(e, days)}
                />
                <label style={{ marginLeft: "4px" }}>{days.Days}</label>
              </li>
            </ul>
          </div>
          <div className="eight wide field">
            {days["isCheck"] && (
              <select
                key={index}
                value={initialTime}
                onChange={(e) => handletime(e, days)}
              >
                {daysandtimes.map((value) => (
                  <option value={JSON.parse(JSON.stringify(value))["Times"]}>
                    {JSON.parse(JSON.stringify(value))["Times"]}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default DayCheckBox;
