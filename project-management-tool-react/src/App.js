import "./App.css";
import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation;
  return (
    <div className="App">
      <Header />
      <Router location={location} key={location.pathname}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/updateProject/:id" component={UpdateProject} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
