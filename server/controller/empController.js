const Emp = require("../model/user");

const EmpController = {
  getAllEmp: async (req, res) => {
    try {
      const emps = await Emp.find();
      res.json(emps);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getOneEmp: async (req, res) => {
    try {
      const id = req.query.id;
      const emps = await Emp.findById(id);
      if (!emps) return res.status(404).json({ error: "Emp not found" });
      res.json(emps);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createEmp: async (req, res) => {
    try {
      const emp = req.body;
      const newEmp = new Emp(emp);
      const saveEmp = await newEmp.save();
      res.status(201).json(saveEmp);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  modifyEmp: async (req, res) => {
    try {
      const id = req.query.id;
      const { name, designation, salary } = req.body;
      const emp = await Emp.findById(id);
      if (!emp) {
        return res.status(404).json({ error: "Emp not found" });
      }
      emp.name = name;
      emp.designation = designation;
      emp.salary = salary;
      const updatedUser = await emp.save();
      res.status(201).json(updatedUser);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteEmp: async (req, res) => {
    try {
      const { id } = req.query;

      // Find the user by ID and remove it
      const deletedEmp = await Emp.findByIdAndDelete(id);
      if (!deletedEmp) {
        return res.status(404).json({ error: "Emp not found" });
      }

      res.json({ message: "User deleted successfully", user: deletedEmp });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = EmpController;
