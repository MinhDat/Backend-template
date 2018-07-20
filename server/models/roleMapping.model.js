import mongoose from "mongoose";

const Schema = mongoose.Schema;
const RoleMapping = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role"
    },
    active: {
      type: Boolean,
      default: false
    },
    delete: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
);

const RoleMappingModel = mongoose.model("roleMapping", RoleMapping);

export default RoleMappingModel;