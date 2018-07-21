import mongoose from "mongoose";
import PrimaryDate from "./utils/primaryDate";
import Connection from "../connection";

const Schema = mongoose.Schema;
const Role = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    content: String,
    permission: {
      type: {},
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
// Role.pre("save", function(next) {
//   console.log("here", this);
//   next();
// });

const RoleModel = Connection.main.model("role", Role);

export default RoleModel;
