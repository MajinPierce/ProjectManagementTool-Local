import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { createProject } from "../../actions/ProjectActions";

const AddProject = (props) => {
  const [enteredProjectName, setEnteredProjectName] = useState("");
  const [enteredProjectIdentifier, setEnteredProjectIdentifier] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredStartDate, setEnteredStartDate] = useState("");
  const [enteredEndDate, setEnteredEndDate] = useState("");
  const errors = useSelector();

  const submitHandler = (event) => {
    //prevent page reset
    event.preventDefault();
    //create project object to send to api
    const projectData = {
      projectName: enteredProjectName,
      projectIdentifier: enteredProjectIdentifier,
      description: enteredDescription,
      startDate: enteredStartDate,
      endDate: enteredEndDate,
    };
    props.createProject(projectData, props.history);
  };

  const projectNameChangeHandler = (event) => {
    setEnteredProjectName(event.target.value);
  };

  const projectIdentifierChangeHandler = (event) => {
    setEnteredProjectIdentifier(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const startDateChangeHandler = (event) => {
    setEnteredStartDate(event.target.value);
  };

  const endDateChangeHandler = (event) => {
    setEnteredEndDate(event.target.value);
  };

  /*
  //life cycle hooks
  const componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      setErrors(nextProps.errors);
    }
  };
  */

  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Create Project form</h5>
            <hr />
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg "
                  placeholder="Project Name"
                  name="projectName"
                  value={enteredProjectName}
                  onChange={projectNameChangeHandler}
                />
                <p>{errors.projectName}</p>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={enteredProjectIdentifier}
                  onChange={projectIdentifierChangeHandler}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Project Description"
                  name="description"
                  value={enteredDescription}
                  onChange={descriptionChangeHandler}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="startDate"
                  value={enteredStartDate}
                  onChange={startDateChangeHandler}
                />
              </div>
              <div className="form-group">
                <label>Estimated End Date</label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="endDate"
                  value={enteredEndDate}
                  onChange={endDateChangeHandler}
                />
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default connect(null, { createProject })(AddProject);
