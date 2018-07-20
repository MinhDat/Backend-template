/**
 * @name API_PUBLIC check, regiester
 * @public domain
 * @version 1
 */

import Express from "express";
import Authenication from "../../controllers/authenication.controller";
import UserController from "../../controllers/user.controller";
import FitnessController from "../../controllers/fitness.controller";

const Router = Express.Router();

//register user
Router.post("/user-register", Authenication.CreateUser)
  //get domains list
  .get("/domain", Authenication.GetDomain)
  //login user
  .put("/login", Authenication.LoginUser)
  //check user existence
  .put("/user-existence", UserController.CheckUserExistence)
  //check fitness existence
  .put("/fitness-existence", FitnessController.CheckFitnessExistence)
  //create fitness with web client
  .post("/fitness-register", FitnessController.CreateFitness)
  //forgot password
  .put("/forgot-password", (req, res, next) => {
    //to do forgot password
    // Authenication.UpdateUser(req, res);
  });

export default Router;
