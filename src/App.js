import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About"
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function App() {
  const [alert, setAlert] = useState(null)
  const alertMaker = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar alertMaker={alertMaker}/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home alertMaker={alertMaker} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login alertMaker={alertMaker}/>} />
              <Route exact path="/signup" element={<Signup alertMaker={alertMaker}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

