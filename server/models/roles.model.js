import mongoose from "mongoose";
import PrimaryDate from "./utils/primaryDate";

const Schema = mongoose.Schema;
const Role = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    content: String,
    permission: {
      type: {
        product: {
          c: true,
          r: false,
          d: false,
          u: false
        }
      },
      _id: false,
      required: true
    },
    delete: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
);

// add primary date
Role.add(PrimaryDate);

const RoleModel = mongoose.model("roles", Role);

export default RoleModel;
