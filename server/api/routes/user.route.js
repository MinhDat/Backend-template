/**
 * @name User_API
 * @private {user token or client oh_token}
 *
 */

import Express from "express";
import UserController from "../../controllers/user.controller";
import { jwt } from "../../middleware";

const Router = Express.Router();

//get users with web admin
Router.get("/", jwt.verify, UserController.GetUsers);

//get a user with web admin
Router.get("/:id", jwt.verify, UserController.GetUserById);

//create user with web admin
Router.put("/", jwt.verify, UserController.CreateUser);

//update user with web admin
Router.post("/:id", jwt.verify, UserController.UpdateUser);

//delete user with web admin
Router.delete("/:id", jwt.verify, UserController.DeleteUser);

export default Router;
