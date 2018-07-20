/**
 * @name Appointment_API
 * @private {fitness token or client oh_token}
 *
 */

import Express from "express";
import AppointmentController from "../../controllers/appointment.controller";
import { jwt } from "../../middleware";

const Router = Express.Router();
//get appointments with web admin
Router.get("/", jwt.verify, AppointmentController.GetAppointments);

//get a appointment with web admin
Router.get("/:id", jwt.verify, AppointmentController.GetAppointmentById);

//create appointment with web admin
Router.put("/", jwt.verify, AppointmentController.CreateAppointment);

//update appointment with web admin
Router.post("/:id", jwt.verify, AppointmentController.UpdateAppointment);

//delete appointment with web admin
Router.delete("/:id", jwt.verify, AppointmentController.DeleteAppointment);

export default Router;
