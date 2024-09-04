import React, { useState } from "react";
import "./App.css"; 

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  const addStudent = () => {
    if (name.trim() !== "" && rollNumber.trim() !== "") {
      setStudents([...students, { name: name.trim(), rollNumber: rollNumber.trim(), status: "Present" }]);
      setName("");
      setRollNumber("");
    }
  };

  const markLeave = (index) => {
    const updatedStudents = students.map((student, i) =>
      i === index ? { ...student, status: "Leave" } : student
    );
    setStudents(updatedStudents);
  };

  const toggleAttendance = (index) => {
    const updatedStudents = students.map((student, i) => {
      if (i === index) {
        const newStatus = student.status === "Present" ? "Absent" : "Present";
        return { ...student, status: newStatus };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  return (
    <div className="body">
    <div className="App">
      <h1>Student Attendance Web</h1>
      <div className="input-section">
        <input
          className="input-field"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
        />
        <input
          className="input-field"
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter roll number"
        />
        <button className="add-button" onClick={addStudent}>Add Student</button>
      </div>
      <ul className="student-list">
        {students.map((student, index) => (
          <li key={index} className="student-item">
            <span className="student-info">
              {student.name} - Roll Number: {student.rollNumber}
            </span>
            <button className={`status-button ${student.status}`} onClick={() => toggleAttendance(index)}>
              {student.status === "Present" ? "Present" : "Absent"}
            </button>
            <button className="leave-button" onClick={() => markLeave(index)}>Mark Leave</button>
            {student.status === "Leave" && <span className="leave-text"> - On Leave</span>}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
