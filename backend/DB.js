const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const mongoURI = process.env.MONGOURI;

if (mongoURI) {
  console.log("MongoDB link: found");
} else {
  console.error("MONGODB_LINK not found in .env file");
}
mongoose.set("strictQuery", false);

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => console.log("connected"));
  // mongoose.connect(mongoURI);
};

module.exports = connectToMongo;
