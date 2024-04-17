const connectToMongo = require("./DB");
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const auth = require("./Routes/auth");
const employee = require("./Routes/employee");

dotenv.config();
var cors = require("cors");


app.use(cors());
connectToMongo();

// to use req.body,,, we have to use a middleware
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// routes that our app can use
const auth_api = process.env.auth_api;
const employee_api = process.env.employee_api;

app.use(auth_api, auth);
app.use(employee_api, employee);

// app.get("/", (req, res) => {
//   console.log(req.url);
//   res.send("Hello, it's garvit!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});