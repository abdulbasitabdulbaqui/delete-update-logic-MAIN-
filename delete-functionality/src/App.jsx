import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import button from "react-bootstrap/Button";
import table from "react-bootstrap/Table";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [submitData, setSubmitData] = useState([]);
  const [id, setId] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
          <h1
            style={{ background: "", marginTop: "10px", borderRadius: "5px" }}
          >
            User Form
          </h1>
          <form action="submit">
            <div>
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
                <label for="email">EMAIL:</label>
                <input
                  type="email"
                  placeholder="enter your email"
                  value={email}
                  onChange={handleEmail}
                />
                <label for="number">NUMBER:</label>
                <input
                  type="number"
                  placeholder="enter your number"
                  value={number}
                  onChange={handleNumber}
                />
                <button onClick={handleSubmit} className="btn btn-success mt-3">
                  submit
                </button>
              </div>
            </div>
          </form>
          <br />
          <div
            className="table-responsive"
            style={{ maxHeight: "199px", overflowY: "auto", overflowX: "auto" }} //For scroll bar
          >
            <table
              className="table table-striped table-bordered table-hover "
              style={{ backgroundColor: "white", borderRadius: "10px" }}
            >
              <thead>
                <tr>
                  <th className="ml-4">NAME</th>
                  <th>EMAIL</th>
                  <th>NUMBER</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              {submitData.map((res) => (
                <tr>
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
            </table>
          </div>
        </div>
      </>
    );
  };


export default App;
