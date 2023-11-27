import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const EmployeeForm = ({ handle, insertTriggered, insertedEmp, setUpdate }) => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [btnName, setBtnName] = useState("Submit");

  useEffect(() => {
    if (Object.keys(insertedEmp).length > 0) {
      setName(insertedEmp.name);
      setDesignation(insertedEmp.designation);
      setSalary(insertedEmp.salary);
      setBtnName("Modify");
    }
  }, [insertTriggered, insertedEmp]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && designation && salary) {
      const empObj = {
        id: insertedEmp?.id ? insertedEmp.id : uuidv4(),
        name,
        designation,
        salary,
      };
      btnName === "Submit" ? handle(empObj) : setUpdate(empObj);
      setName("");
      setDesignation("");
      setSalary("");
      btnName === "Submit"
        ? toast.success("A New Employee Added")
        : toast.success("Employee Data Modified");
      setBtnName("Submit");
    } else {
      toast.error("Employee all information must be filled");
    }
  };

  const handleCancelModify = (event) => {
    event.preventDefault();
    setName("");
    setDesignation("");
    setSalary("");
    setBtnName("Submit");
  };

  //   const updateEmpForm = (empData) => {};

  return (
    <>
      <div className="row justify-content-center">
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              id="name"
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="designation" className="form-label">
              Designation
            </label>
            <input
              className="form-control"
              id="designation"
              required
              value={designation}
              onChange={(event) => {
                setDesignation(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              className="form-control"
              id="salary"
              required
              value={salary}
              type="number"
              onChange={(event) => setSalary(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className={
              name && designation && salary
                ? "btn btn-primary"
                : "btn disable-btn"
            }
            onClick={handleSubmit}
          >
            {btnName}
          </button>
          {btnName === "Modify" && (
            <button
              type="submit"
              className="btn btn-danger mx-3"
              onClick={handleCancelModify}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default EmployeeForm;
