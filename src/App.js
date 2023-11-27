import { useState } from "react";
import "./App.css";
import EmployeeForm from "./Components/EmployeeForm";
import EmployeeTable from "./Components/EmployeeTable";
import { Toaster } from "react-hot-toast";

function App() {
  const [triggered, setTriggered] = useState(0);
  const [insertTriggered, setInsertTriggered] = useState(0);
  const [insertedEmp, setInsertedEmp] = useState({});
  const [updateTableTriggered, setUpdateTableTriggered] = useState(0);
  const [empData, setEmpData] = useState({});
  const [updatedEmp, setUpdatedEmp] = useState({});

  const handleEmpData = (empData) => {
    setEmpData(empData);
    setTriggered((prev) => prev + 1);
  };

  const handleInsertEmp = (emp) => {
    setInsertTriggered((prev) => prev + 1);
    setInsertedEmp(emp);
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
        insertedEmp={insertedEmp}
        setUpdate={setUpdateEmpData}
      ></EmployeeForm>
      <EmployeeTable
        triggered={triggered}
        empNewData={empData}
        update={handleInsertEmp}
        updatedEmp={updatedEmp}
        updateTableTriggered={updateTableTriggered}
      ></EmployeeTable>
    </div>
  );
}

export default App;
