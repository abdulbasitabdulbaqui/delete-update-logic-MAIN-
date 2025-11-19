import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Form from "react-bootstrap/Form";
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [submitData, setSubmitData] = useState([]);
  const [id, setId] = useState("");
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [emailError, setEmailError] = useState("");

  const isValidateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleName = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.length < 3) {
      setNameError("Name must be at least 3 characters long");
      return;
    } else if (value.length > 25) {
      setNameError("Name must not have more then 25 characters");
      return;
    } else {
      setNameError("");
    }
  
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    let value = e.target.value;
    setEmailError(isValidateEmail(value) ? "" : "Invalid Email Address");
    return;
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
    let value = e.target.value;
    if (value.length < 10) {
      setNumberError("number must have 10 digits");
      return;
    } else if (value.length > 10) {
      setNumberError("number must have 10 digits");
      return;
    } else {
      setNumberError("");
    }
    return;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
     if (nameError || emailError || numberError) {
       alert("Fix all errors before submitting!");
      return;
    }

    if (!name || !email || !number) {
      alert("Inputs Are Should Not Be Empty");
      return;

    }
    // If no ID => add new
    if (!id) {
      setSubmitData([...submitData, { id: Date.now(), name, email, number }]);
    }
    // If ID exists => update
    else {
      const updated = submitData.map((item) =>
        item.id === id ? { ...item, name, email, number } : item
      );
      setSubmitData(updated);
      setId(""); // exit edit mode
    }
    // Reset fields
    setName("");
    setEmail("");
    setNumber("");
    if (!isValidateEmail(email)) {
      setEmailError("Invalid Email Address");
    } else {
      setEmail("");
      setEmailError("");
    }
   
  };
  const handleDelete = (id) => {
    const dt = submitData.filter((res) => res.id !== id);
    setSubmitData(dt);
  };
  const handleEdit = (id) => {
    const dtt = submitData.filter((item) => item.id === id);
    if (dtt.length > 0) {
      setName(dtt[0].name);
      setEmail(dtt[0].email);
      setNumber(dtt[0].number);
      setId(dtt[0].id);
    }
  };
  return (
    <>
      <div
        className="container"
        style={{
          height: "100vh",
          width: "70vh",
          backgroundColor: "#6c757d",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ background: "", marginTop: "10px", borderRadius: "5px" }}>
          User Form
        </h1>
        <Form action="submit" onSubmit={handleSubmit}>
          <div className="form-group">
            <div
              className="form-control"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px", // spacing between rows
                marginTop: "5px",
                padding: "10px",
                background: "white",
                borderRadius: "10px",
              }}
            >
              <label>NAME:</label>
              <input
                type="text"
                placeholder="enter your name"
                value={name}
                onChange={handleName}
                style={{ marginTop: "10px" }}
              />
              {nameError && <p style={{ color: "red" }}>{nameError}</p>}
              <label for="email">EMAIL:</label>
              <input
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={handleEmail}
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}

              <label for="number">NUMBER:</label>
              <input
                type="number"
                placeholder="enter your number"
                value={number}
                onChange={handleNumber}
              />
              {numberError && <p style={{ color: "red" }}>{numberError}</p>}
              <button className="btn btn-success mt-3">submit</button>
            </div>
          </div>
        </Form>
        <br />
        <div
          className="table-responsive"
          style={{ maxHeight: "25vh", overflowY: "auto", overflowX: "auto" }} //For scroll bar
        >
          <Table
            className="table table-striped table-bordered table-hover "
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            <thead>
              <tr>
                <th className="ml-4">NAME</th>
                <th>EMAIL</th>
                <th>NUMBER</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {submitData.map((res) => (
                <tr key={res.id}>
                  <td>{res.name}</td>
                  <td>{res.email}</td>
                  <td>{res.number}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(res.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(res.id)}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
