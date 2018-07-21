/**
 * @name RoleMapping_API
 * @private {fitness token or client oh_token}
 *
 */

import Express from "express";
import RoleMappingController from "../../controllers/roleMapping.controller";
import { jwt } from "../../middleware";

const Router = Express.Router();

//get fitnesses with web admin
// Router.get("/", jwt.verify, RoleMappingController.GetRoleMappings);

//get a fitness with web admin
Router.get("/:userId", jwt.verify, RoleMappingController.GetRoleMappingById);

//create fitness with web admin
Router.put("/", jwt.verify, RoleMappingController.CreateRoleMapping);

//update fitness with web admin
Router.post("/:userId", jwt.verify, RoleMappingController.UpdateRoleMapping);

//delete fitness with web admin
// Router.delete("/:id", jwt.verify, RoleMappingController.DeleteRoleMapping);

export default Router;
