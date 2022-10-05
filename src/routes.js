const routes = require("express").Router();


const auth = require("./middleware/authMiddleware");

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");


routes.post("/auth", AuthController.authenticate);
routes.post("/user", UserController.create);
routes.get("/user", auth, UserController.index);


module.exports = routes;
