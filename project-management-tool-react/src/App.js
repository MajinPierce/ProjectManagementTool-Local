import "./App.css";
import React from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import { useLocation } from "react-router-dom";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";

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
          <Route exact path="/projectBoard/:id" component={ProjectBoard} />
          <Route exact path="/addProjectTask/:id" component={AddProjectTask} />
          <Route
            exact
            path="/updateProjectTask/:backlog_id/:pt_id"
            component={UpdateProjectTask}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
