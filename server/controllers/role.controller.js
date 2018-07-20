import RoleModel from "../models/role.model";
import Constant from "../common/constants/constant";

const { STATUS_MESSAGES } = Constant;

//skip
//limmit
async function GetRoles(req, res, next) {
  try {
    let roles = await RoleModel.find({});
    next({ status: 200, message: roles });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function GetRoleById(req, res, next) {
  try {
    let role = await RoleModel.find({ _id: req.params.id });
    next({ status: 200, message: role });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function CreateRole(req, res, next) {
  try {
    let newRole = req.body;
    let createdRole = await RoleModel.create(newRole);
    next({ status: 200, message: createdRole });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function UpdateRole(req, res, next) {
  try {
    let updatedRole = await RoleModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedRole) {
      next({ status: 200, message: updatedRole });
    } else {
      next({ status: 400, message: STATUS_MESSAGES.ProblemData });
    }
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function DeleteRole(req, res, next) {
  try {
    let removedRole = await RoleModel.findOneAndRemove({
      _id: req.params.id
    });
    next({ status: 200, message: removedRole });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

export default {
  GetRoles,
  GetRoleById,
  CreateRole,
  UpdateRole,
  DeleteRole
};
