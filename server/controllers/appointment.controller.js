import AppointmentModel from "../models/appointment.model";
import Constant from "../common/constants/constant";

const { STATUS_MESSAGES } = Constant;

async function GetAppointments(req, res, next) {
  try {
    let appointments = await AppointmentModel.find({});
    next({ status: 200, message: appointments });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function GetAppointmentById(req, res, next) {
  try {
    let appointment = await AppointmentModel.find({ _id: req.params.id });
    next({ status: 200, message: appointment });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function CreateAppointment(req, res, next) {
  try {
    let newAppointment = new AppointmentModel(req.body);
    let createdAppointment = await newAppointment.save();
    next({ status: 200, message: createdAppointment });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function UpdateAppointment(req, res, next) {
  try {
    let updatedAppointment = await AppointmentModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedAppointment) {
      next({ status: 200, message: updatedAppointment });
    } else {
      next({ status: 400, message: STATUS_MESSAGES.ProblemData });
    }
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function DeleteAppointment(req, res, next) {
  try {
    let removedAppointment = await AppointmentModel.findOneAndRemove({
      _id: req.params.id
    });
    next({ status: 200, message: removedAppointment });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

export default {
  GetAppointments,
  GetAppointmentById,
  CreateAppointment,
  UpdateAppointment,
  DeleteAppointment
};
