import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const EmployeeForm = ({ handle, insertTriggered, insertedEmpId }) => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [btnName, setBtnName] = useState("Submit");
  const apiUrl = process.env.REACT_APP_API_URL;

  const createEmp = () => {
    axios
      .post(`${apiUrl}/emp`, {
        name,
        designation,
        salary,
      })
      .then(() => {
        toast.success("A New Employee Added");
        handle();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (insertedEmpId) {
      axios
        .get(`${apiUrl}/emp/one`, { params: { id: insertedEmpId } })
        .then((res) => {
          setName(res.data.name);
          setDesignation(res.data.designation);
          setSalary(res.data.salary);
          setBtnName("Modify");
        });
    }
  }, [insertTriggered]);

  const updateEmployee = () => {
    axios
      .patch(`${apiUrl}/emp?id=${insertedEmpId}`, {
        name,
        designation,
        salary,
      })
      .then((res) => {
        toast.success("Employee Data Modified");
        handle();
      })
      .error((err) => {
        toast.error(`Internal server error`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && designation && salary) {
      btnName === "Submit" ? createEmp() : updateEmployee();
      setName("");
      setDesignation("");
      setSalary("");
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
