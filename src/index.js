require("dotenv").config();
const Mongo = require("./services/db/mongo");
const express = require("express");
const routes = require("./routes");
const app = express();

const database = Mongo;
database.isConnected();
database.connect();

app.use(express.json());
app.use(routes);

app.listen(3333, (error) => {
  try {
    console.log("sever starter");
  } catch (error) {
    console.error("erro", error);
  }
});
