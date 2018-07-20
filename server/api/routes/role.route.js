/**
 * @name Role_API
 * @private {fitness token or client oh_token}
 *
 */

import Express from "express";
import RoleController from "../../controllers/role.controller";
import { jwt } from "../../middleware";

const Router = Express.Router();

//get fitnesses with web admin
Router.get("/", jwt.verify, RoleController.GetRoles);

//get a fitness with web admin
Router.get("/:id", jwt.verify, RoleController.GetRoleById);

//create fitness with web admin
Router.put("/", jwt.verify, RoleController.CreateRole);

//update fitness with web admin
Router.post("/:id", jwt.verify, RoleController.UpdateRole);

//delete fitness with web admin
Router.delete("/:id", jwt.verify, RoleController.DeleteRole);

export default Router;
