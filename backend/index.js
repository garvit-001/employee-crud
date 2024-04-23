const connectToMongo = require("./DB");
const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const auth = require("./Routes/auth");
const employee = require("./Routes/routes");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const { definition } = require("@fortawesome/free-solid-svg-icons/fa0");
const cluster = require("node:cluster");
const http = require("node:http");
const numCPUs = require("node:os").availableParallelism();
const process = require("node:process");

dotenv.config();
var cors = require("cors");

app.use(cors());
connectToMongo();

// clustering
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // to use req.body,,, we have to use a middleware
  app.use(express.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Employee detail app",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["./Routes/*.js"],
  };

  const spacs = swaggerjsdoc(options);
  app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs));

  // routes that our app can use
  const auth_api = process.env.auth_api;
  const employee_api = process.env.employee_api;

  app.use(auth_api, auth);
  app.use(employee_api, employee);
  // Workers can share any TCP connection
  // In this case it is an HTTP server

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  console.log(`Worker ${process.pid} started`);
}
