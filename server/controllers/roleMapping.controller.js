import RoleMappingModel from "../models/roleMapping.model";
import RoleModel from "../models/roleMapping.model";
import Constant from "../common/constants/constant";

const { STATUS_MESSAGES } = Constant;

//skip
//limmit
// async function GetRoleMappings(req, res, next) {
//   try {
//     let roleMappings = await RoleMappingModel.find({});

//     next({ status: 200, message: roleMappings });
//   } catch (ex) {
//     next({ status: 500, message: ex });
//   }
// }

async function GetRoleMappingById(req, res, next) {
  try {
    let roleMapping = await RoleMappingModel.find({ user: req.params.userId });
    let roles = await RoleModel.find({ _id: "5b51aa52926eac1691ede9d3" });
    console.log(roles);
    next({ status: 200, message: roleMapping });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function CreateRoleMapping(req, res, next) {
  try {
    let newRoleMapping = req.body;
    let createdRoleMapping = await RoleMappingModel.create(newRoleMapping);
    next({ status: 200, message: createdRoleMapping });
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

async function UpdateRoleMapping(req, res, next) {
  try {
    let updatedRoleMapping = await RoleMappingModel.findOneAndUpdate(
      { user: req.params.userId },
      req.body,
      { new: true }
    );
    if (updatedRoleMapping) {
      next({ status: 200, message: updatedRoleMapping });
    } else {
      next({ status: 400, message: STATUS_MESSAGES.ProblemData });
    }
  } catch (ex) {
    next({ status: 500, message: ex });
  }
}

// async function DeleteRoleMapping(req, res, next) {
//   try {
//     let removedRoleMapping = await RoleMappingModel.findOneAndRemove({
//       _id: req.params.id
//     });
//     next({ status: 200, message: removedRoleMapping });
//   } catch (ex) {
//     next({ status: 500, message: ex });
//   }
// }

export default {
  //   GetRoleMappings,
  GetRoleMappingById,
  CreateRoleMapping,
  UpdateRoleMapping
  //   DeleteRoleMapping
};
