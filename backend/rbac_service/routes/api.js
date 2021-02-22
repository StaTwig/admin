const express = require("express");
const RbacController = require("../controllers/RbacController");
const app = express();
app.get("/",(req,res)=> res.send({status:"OK"}))
app.get("/getPermissions", RbacController.getPermissions);
app.post("/addPermissions", RbacController.addPermissions);
module.exports = app;
