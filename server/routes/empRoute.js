const express = require("express");
const router = express.Router();
const EmpController = require("../controller/empController");

router.get("/emp", EmpController.getAllEmp);
router.post("/emp", EmpController.createEmp);
router.patch("/emp", EmpController.modifyEmp);
router.delete("/emp", EmpController.deleteEmp);

module.exports = router;
