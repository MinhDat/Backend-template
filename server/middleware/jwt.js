import jwt from "jsonwebtoken";
import serverConfig from "../config";

import Constant from "../common/constants/constant";
import UserModel from "../models/user.model";

const { STATUS_MESSAGES, EXPIRES_TIME } = Constant;

export default {
  sign: user => {
    // console.log(user);
    // delete userObj.accesstoken;
    const token = jwt.sign({ id: user._id }, serverConfig.secret, {
      expiresIn: EXPIRES_TIME // expires in 24 hours
    });
    return { auth: true, token: token };
  },
  verify: (req, res, next) => {
    const token = req.headers["oh-access-token"];
    // console.log(token);
    const parseJWT = async () => {
      try {
        const verify = jwt.verify(token, serverConfig.secret, {
          expiresIn: EXPIRES_TIME // expires in 24 hours
        });
        const user = await UserModel.findOne({ _id: verify.id });
        if (user) return true;
        else return false;
      } catch (ex) {
        return false;
      }
    };
    parseJWT().then(auth => {
      if (!auth) {
        // res.status(401).send(STATUS_MESSAGES[401]);
        next({
          status: 401,
          message: { message: STATUS_MESSAGES.Unauthorized, code: 401 }
        });
      }
    });
    next();
  }
};
