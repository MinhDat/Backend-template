/**
 * @name Fitness_API
 * @private {fitness token or client oh_token}
 *
 */

import Express from "express";
import FitnessController from "../../controllers/fitness.controller";
import { jwt } from "../../middleware";

const Router = Express.Router();

//get fitnesses with web admin
Router.get("/", jwt.verify, FitnessController.GetFitnesses);

//get a fitness with web admin
Router.get("/:id", jwt.verify, FitnessController.GetFitnessById);

//create fitness with web admin
Router.put("/", jwt.verify, FitnessController.CreateFitness);

//update fitness with web admin
Router.post("/:id", jwt.verify, FitnessController.UpdateFitness);

//delete fitness with web admin
Router.delete("/:id", jwt.verify, FitnessController.DeleteFitness);

export default Router;
