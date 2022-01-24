import React, { useState } from "react";

const AddProject = (props) => {
  const [enteredProjectName, setEnteredProjectName] = useState("");
  const [enteredProjectIdentifier, setEnteredProjectIdentifier] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredStartDate, setEnteredStartDate] = useState("");
  const [enteredEndDate, setEnteredEndDate] = useState("");

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
    console.log(projectData);
    //reset form
    setEnteredProjectName("");
    setEnteredProjectIdentifier("");
    setEnteredDescription("");
    setEnteredStartDate("");
    setEnteredEndDate("");
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

export default AddProject;
