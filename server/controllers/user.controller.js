import UserModel from "../models/user.model";
import Constant from "../common/constants/constant";
import { duplicateInformFormat } from "../middleware/dataResponse";

const { STATUS_MESSAGES } = Constant;

//skip
//limmit
async function GetUsers(req, res, next) {
  try {
    let object = {};
    if (req.headers["fitness"]) {
      object = {
        fitness: req.headers["fitness"]
      };
    }
    let users = await UserModel.find(object);
    users = users.map(user => UserformatResponse(user));
    next({ status: 200, message: users });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function GetUserById(req, res, next) {
  try {
    let user = await UserModel.find({ _id: req.params.id });
    next({ status: 200, message: user });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function CreateUser(req, res, next) {
  try {
    let newUser = new UserModel(req.body);
    let createdUser = await newUser.save();
    next({ status: 200, message: createdUser });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function UpdateUser(req, res, next) {
  try {
    let updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedUser) {
      next({ status: 200, message: updatedUser });
    } else {
      next({ status: 400, message: STATUS_MESSAGES.ProblemData });
    }
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function DeleteUser(req, res, next) {
  try {
    let removedUser = await UserModel.findOneAndRemove({
      _id: req.params.id
    });
    next({ status: 200, message: removedUser });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function CheckUserExistence(req, res, next) {
  try {
    let user = await UserModel.find({ email: req.body.email });
    if (user.length > 0) {
      next(duplicateInformFormat("Email"));
    }

    user = await UserModel.find({ username: req.body.username });
    if (user.length > 0) {
      next(duplicateInformFormat("Username"));
    }

    user = await UserModel.find({ phone: req.body.phone });
    if (user.length > 0) {
      next(duplicateInformFormat("Phone number"));
    }

    if (user.length === 0) {
      next({
        status: 200,
        message: req.body
      });
    }
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

function UserformatResponse(user) {
  const dataExcept = [
    "password",
    "address",
    "salt",
    "accesstoken",
    // "_id",
    "avatar",
    "active",
    "devices"
  ];
  let object = Object.assign({}, user)._doc;
  for (let i in dataExcept) {
    delete object[dataExcept[i]];
  }
  return object;
}

export default {
  GetUsers,
  GetUserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
  CheckUserExistence
};
