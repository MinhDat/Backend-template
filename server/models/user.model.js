import mongoose from "mongoose";
import Connection from "../connection";
import { authenication, jwt } from "../middleware";
import PrimaryDate from "./utils/primaryDate";
import PrimaryInfo from "./utils/primaryInfo";

const Schema = mongoose.Schema;
const userSchema = new PrimaryInfo(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    accesstoken: {
      type: String,
      unique: true
    },
    fullname: {
      type: String
      // required: true
    },
    devices: {
      type: [
        {
          id: {
            type: String,
            required: true
          },
          token: {
            type: String
          },
          name: {
            type: String
          },
          _id: false
        }
      ]
    },
    avatar: {
      type: Schema.Types.ObjectId
    },
    fitness: {
      type: Schema.Types.ObjectId
    },
    salt: {
      type: String
    },
    lastLogonTime: {
      type: Date,
      default: new Date()
    }
  },
  {
    versionKey: false
  }
);

//Add the primary schemas
userSchema.add(PrimaryDate);

userSchema.pre("save", function(next) {
  let self = this;
  if (self.isNew || self.isModified("password")) {
    const hash = authenication.hashPassword(self.password);
    self.password = hash.password;
    self.salt = hash.salt;
    const sign = jwt.sign(self);
    self.accesstoken = sign.token;
  }
  next();
});

const UserModel = Connection.main.model("User", userSchema);

export default UserModel;
