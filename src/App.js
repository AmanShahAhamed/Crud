import { useState } from "react";
import "./App.css";
import EmployeeForm from "./Components/EmployeeForm";
import EmployeeTable from "./Components/EmployeeTable";
import { Toaster } from "react-hot-toast";

function App() {
  const [triggered, setTriggered] = useState(0);
  const [insertTriggered, setInsertTriggered] = useState(0);
  const [insertedEmpId, setInsertedEmpId] = useState({});
  const [updateTableTriggered, setUpdateTableTriggered] = useState(0);
  const [updatedEmp, setUpdatedEmp] = useState({});

  const handleEmpData = (empData) => {
    setTriggered((prev) => prev + 1);
  };

  const handleInsertEmp = (id) => {
    setInsertTriggered((prev) => prev + 1);
    setInsertedEmpId(id);
  };

  const setUpdateEmpData = (emp) => {
    setUpdatedEmp(emp);
    setUpdateTableTriggered((prev) => prev + 1);
  };

  return (
    <div className="container">
      <Toaster position="top-right"></Toaster>
      <h1 className="text-success text-center">Employee Data</h1>
      <EmployeeForm
        handle={handleEmpData}
        insertTriggered={insertTriggered}
        insertedEmpId={insertedEmpId}
        setUpdate={setUpdateEmpData}
      ></EmployeeForm>
      <EmployeeTable
        triggered={triggered}
        update={handleInsertEmp}
        updatedEmp={updatedEmp}
        updateTableTriggered={updateTableTriggered}
      ></EmployeeTable>
    </div>
  );
}

export default App;
