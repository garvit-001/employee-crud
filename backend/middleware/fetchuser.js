// const jwt = require("jsonwebtoken");
// const JWT_SECRET = "nice@app";

// const fetchuser = (req, res, next) => {
//   // get user from jwt token and add id to req object
//   const authHeader = req.header("Authorization");
//   const authHeader1 = req.header("authToken");
//   console.log(req.authHeader, req.authHeader1);
//   if (!authHeader && !authHeader1) {
//     return res
//       .status(401)
//       .send({ error: "Please authenticate using a valid token 1" });
//   }

//   const tokenArray = authHeader.split(" ");
//   const token = tokenArray[1];
//   console.log(token);
//   if (!token) {
//     return res
//       .status(401)
//       .send({ error: "Please authenticate using a valid token 2" });
//   }

//   try {
//     const data = jwt.verify(token, JWT_SECRET);
//     req.user = data.user;
//     // next is that function which is just after the fetchuser middleware
//     console.log("admin:", req.user);
//     next();
//   } catch (error) {
//     res
//       .status(401)
//       .send({ error: "Please authenticate using a valid token 3" });
//   }
// };

// module.exports = fetchuser;

const jwt = require("jsonwebtoken");
const JWT_SECRET = "nice@app";

const fetchuser = (req, res, next) => {
  // get user from jwt token and add id to req object
  const token = req.header("authToken");
  console.log(token);
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token 1" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    console.log("admin:", req.user);

    // next is that function which is just after the fetchuser middleware
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token 2" });
  }
};

module.exports = fetchuser;
