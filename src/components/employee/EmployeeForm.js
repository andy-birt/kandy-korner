import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "../location/LocationProvider";
import { EmployeeContext } from "../employee/EmployeeProvider";
import "./Employee.css";
import { useNavigate } from 'react-router-dom';

export const EmployeeForm = () => {
  const { addEmployee } = useContext(EmployeeContext);
  const { locations, getLocations } = useContext(LocationContext);

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

  Define the intial state of the form inputs with useState()
  */

  const [employee, setEmployee] = useState({
    name: "",
    locationId: 0,
    manager: false,
    fullTime: false,
    hourlyRate: 0
  });

  const navigate = useNavigate();

  /*
  Reach out to the world and get customers state
  and locations state on initialization.
  */
  useEffect(() => {
    getLocations();
  }, []);

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newEmployee = { ...employee };
    /* Employee is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newEmployee[event.target.id] = parseInt(event.target.value) ? parseInt(event.target.value) : event.target.type !== 'checkbox' ? event.target.value : event.target.checked;
    // update state
    setEmployee(newEmployee);
  }

  const handleClickSaveEmployee = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form

    const locationId = parseInt(employee.locationId);

    if (locationId === 0) {
      window.alert("Please select a location");
    } else {
      //invoke addEmployee passing employee as an argument.
      //once complete, change the url and display the employee list
      addEmployee(employee)
      .then(() => navigate("/employees"));
    }
  }

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Employee name:</label>
          <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select defaultValue={employee.locationId} onChange={handleControlledInputChange} name="locationId" id="locationId" className="form-control" >
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="manager">Manager: </label>
          <input type="checkbox" defaultValue={employee.manager} onChange={handleControlledInputChange} name="manager" id="manager" className="form-control" />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="fullTime">Full Time: </label>
          <input type="checkbox" defaultValue={employee.fullTime} onChange={handleControlledInputChange} name="fullTime" id="fullTime" className="form-control" />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="hourlyRate">Hourly Rate: $</label>
          <input type="number" defaultValue={employee.hourlyRate} onChange={handleControlledInputChange} name="hourlyRate" id="hourlyRate" className="form-control" />
        </div>
      </fieldset>
      <button className="btn btn-primary"
        onClick={handleClickSaveEmployee}>
        Save Employee
      </button>
    </form>
  );
}
