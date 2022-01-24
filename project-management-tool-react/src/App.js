import "./App.css";
import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import { Routes, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/addProject" element={<AddProject />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
