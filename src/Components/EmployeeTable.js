import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const EmployeeTable = (props) => {
  const [empData, setEmpData] = useState([]);

  const fetchData = () => {
    axios
      .get(`${apiUrl}/emp`)
      .then((response) => {
        setEmpData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => fetchData(), [props.triggered]);

  useEffect(() => {
    if (Object.keys(props.updatedEmp).length > 0) {
      setEmpData((prev) =>
        prev.map((data) =>
          data.id === props.updatedEmp.id ? props.updatedEmp : data
        )
      );
    }
  }, [props.updateTableTriggered, props.updatedEmp]);

  const deleteEmpData = async (id) => {
    axios
      .delete(`${apiUrl}/emp`, { params: { id } })
      .then((response) => {
        toast.success("Employee removed");
        fetchData();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const updateEmpData = (id) => props.update(id);

  const mapEmpData = empData.map((data) => {
    return (
      <tr key={data._id}>
        <td>{data.name}</td>
        <td>{data.designation}</td>
        <td>{data.salary}</td>
        <td>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => deleteEmpData(data._id)}
          >
            {" "}
            <MdDelete color="red" />
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => updateEmpData(data._id)}
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
