const express = require("express");
const app = express();
import bodyParser from 'body-parser';
import { getUserList ,findUserById } from "./user";
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
const userList = getUserList(); // assume for now this is your database

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(
  '/',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);


app.listen(8000, () => {
  console.log("server listening on port 8000!");
});
