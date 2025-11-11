import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [submitData, setSubmitData] = useState([]);
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
    setSubmitData([...submitData, { id: Date.now(), name, email, number }]);
    setEmail("");
    setName("");
    setNumber("");
  };
  const handleDelete = (id) => {
    const dt = submitData.filter((res) => res.id !== id);
    setSubmitData(dt);
  };
  const handleEdit = (id) => {
    const dtt = submitData.filter((res) => res.id === id);
    if (dtt !== undefined) {
      setName(dtt[0].name);
      setNumber(dtt[0].number);
      setEmail(dtt[0].email);
    }
  };
  return (
    <>
      <form action="submit">
        <input
          type="text"
          placeholder="enter your name"
          value={name}
          onChange={handleName}
        />
        <input
          type="text"
          placeholder="enter your email"
          value={email}
          onChange={handleEmail}
        />
        <input
          type="text"
          placeholder="enter your number"
          value={number}
          onChange={handleNumber}
        />
        <button onClick={handleSubmit}>submit</button>
      </form>
      <table>
        <tr>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>NUMBER</th>
        </tr>
        {submitData.map((res) => (
          <tr>
            <td>{res.name}</td>
            <td>{res.email}</td>
            <td>{res.number}</td>
            <button onClick={() => handleDelete(res.id)}>Delete</button>
            <button onClick={() => handleEdit(res.id)}>Edit</button>
          </tr>
        ))}
      </table>
    </>
  );
}

export default App;
