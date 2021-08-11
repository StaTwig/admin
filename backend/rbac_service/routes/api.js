const express = require("express");
const RbacController = require("../controllers/RbacController");
const app = express();
app.get("/",(req,res)=> res.status(200).json({status:"OK", Message:"RBAC Service"}));
app.get("/getPermissions", RbacController.getPermissions);
app.get("/getRoles", RbacController.getRoles);
app.post("/addPermissions", RbacController.addPermissions);

module.exports = app;
