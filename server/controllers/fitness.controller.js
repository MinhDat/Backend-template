import FitnessModel from "../models/fitness.model";
import Constant from "../common/constants/constant";
import { duplicateInformFormat } from "../middleware/dataResponse";

const { STATUS_MESSAGES } = Constant;

async function GetFitnesses(req, res, next) {
  try {
    let fitnesses = await FitnessModel.find({});
    next({ status: 200, message: fitnesses });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function GetFitnessById(req, res, next) {
  try {
    let fitness = await FitnessModel.find({ _id: req.params.id });
    next({ status: 200, message: fitness });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function CreateFitness(req, res, next) {
  try {
    let newFitness = new FitnessModel(req.body);
    let createdFitness = await newFitness.save();
    next({ status: 200, message: createdFitness });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function UpdateFitness(req, res, next) {
  try {
    let updatedFitness = await FitnessModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedFitness) {
      next({ status: 200, message: updatedFitness });
    } else {
      next({ status: 400, message: STATUS_MESSAGES.ProblemData });
    }
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function DeleteFitness(req, res, next) {
  try {
    let removedFitness = await FitnessModel.findOneAndRemove({
      _id: req.params.id
    });
    next({ status: 200, message: removedFitness });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function CheckFitnessExistence(req, res, next) {
  try {
    let fitness = await FitnessModel.find({ phone: req.body.phone });
    if (fitness.length > 0) {
      next(duplicateInformFormat("Phone number"));
    }

    fitness = await FitnessModel.find({ email: req.body.email });
    if (fitness.length > 0) {
      next(duplicateInformFormat("Email"));
    }

    if (fitness.length === 0) {
      next({
        status: 200,
        message: req.body
      });
    }
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

export default {
  GetFitnesses,
  GetFitnessById,
  CreateFitness,
  UpdateFitness,
  DeleteFitness,
  CheckFitnessExistence
};
