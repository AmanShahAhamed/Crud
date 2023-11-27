import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import toast from "react-hot-toast";

const EmpData = [
  { id: "tt", name: "aman", salary: 10000, designation: "software engineer" },
  {
    id: "uu",
    name: "aman shah",
    salary: 10000,
    designation: "software engineer",
  },
  {
    id: "vv",
    name: "aman shah ahahmed",
    salary: 10000,
    designation: "software engineer",
  },
  { id: "aa", name: "aman2 ", salary: 10000, designation: "software engineer" },
  {
    id: "ww",
    name: "aman don",
    salary: 10000,
    designation: "software engineer",
  },
  {
    id: "xx",
    name: "aman king",
    salary: 10000,
    designation: "software engineer",
  },
];

const EmployeeTable = (props) => {
  const [empData, setEmpData] = useState(EmpData);

  useEffect(() => {
    if (Object.keys(props.empNewData).length > 0) {
      setEmpData((prev) => [props.empNewData, ...prev]);
    }
  }, [props.triggered, props.empNewData]);

  useEffect(() => {
    if (Object.keys(props.updatedEmp).length > 0) {
      setEmpData((prev) =>
        prev.map((data) =>
          data.id === props.updatedEmp.id ? props.updatedEmp : data
        )
      );
    }
  }, [props.updateTableTriggered, props.updatedEmp]);

  const deleteEmpData = (id) => {
    setEmpData((prev) => prev.filter((obj) => obj.id !== id));
    toast.success("Employee removed");
  };

  const updateEmpData = (id) => {
    const emp = empData.find((e) => e.id === id);
    props.update(emp);
  };

  const mapEmpData = empData.map((data) => {
    return (
      <tr key={data.id}>
        <td>{data.name}</td>
        <td>{data.designation}</td>
        <td>{data.salary}</td>
        <td>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => deleteEmpData(data.id)}
          >
            {" "}
            <MdDelete color="red" />
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => updateEmpData(data.id)}
          >
            {" "}
            <FaPencil color="blue" />
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="row my-3">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Salary</th>
            <th scope="col">Designation</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{mapEmpData}</tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
