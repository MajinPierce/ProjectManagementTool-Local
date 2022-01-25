import "./App.css";
import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import { Routes, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/addProject" element={<AddProject />} />
        <Route exact path="/updateProject/:id" element={<UpdateProject />} />
      </Routes>
    </div>
  );
}

export default App;
