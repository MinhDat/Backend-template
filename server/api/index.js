import Express from "express";

import NoAuthRoute from "./routes/noAuth.route";
import FitnessRoute from "./routes/fitness.route";
import UserRoute from "./routes/user.route";
import AppointmentRoute from "./routes/appointment.route";
import { SuccessHandler, ErrorHandler } from "../middleware";

const Router = Express.Router();
// console.log(errorHandler);
Router.use("/oauth", NoAuthRoute);
Router.use("/fitness", FitnessRoute);
Router.use("/user", UserRoute);
Router.use("/appointment", AppointmentRoute);

Router.use(SuccessHandler());
Router.use(ErrorHandler());

export default Router;
