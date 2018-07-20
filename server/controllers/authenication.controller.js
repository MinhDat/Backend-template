import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import { jwt } from "../middleware";
import Constant from "../common/constants/constant";
import FitnessModel from "../models/fitness.model";

const { EXPIRES_TIME, STATUS_MESSAGES } = Constant;

async function CreateUser(req, res, next) {
  try {
    const { body } = req;
    body.update = { updateBy: req.body.email };
    let newUser = new UserModel(body);
    let createdUser = await newUser.save();
    // let createdUser = await UserModel.create(newUser);
    next({
      status: 200,
      message: convertUserModelToUserResponse(createdUser)
    });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function LoginUser(req, res, next) {
  try {
    let user = await UserModel.findOne({ username: req.body.username });
    if (user) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (passwordIsValid) {
        const Sign = jwt.sign(user);
        if (Sign.token !== user.accesstoken) {
          user = await UserModel.findOneAndUpdate(
            { _id: user._id },
            { accesstoken: Sign.token },
            { new: true }
          );
        }
        next({ status: 200, message: convertUserModelToUserResponse(user) });
      }
      next({ status: 400, message: STATUS_MESSAGES.InvlaidFormat });
    }
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function GetDomain(req, res, next) {
  try {
    const fitnesses = await FitnessModel.find({});
    const data = fitnesses.map(f => f.domain);
    next({ status: 200, message: data });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

// async function CheckFitness(req, res, next) {
//   try {
//     // console.log(req.body.domain);
//     const fitnesses = await FitnessModel.find({ ...req.body });
//     next({ status: 200, message: fitnesses.length > 0 });
//   } catch (ex) {
//     next({ status: 500, message: ex });
//   }
// }

function convertUserModelToUserResponse(userModel) {
  const userObj = userModel.toObject();
  return {
    auth: true,
    access_token: userObj.accesstoken,
    expires: EXPIRES_TIME,
    fitness: userObj.fitness
  };
}

export default {
  CreateUser,
  LoginUser,
  GetDomain
};
