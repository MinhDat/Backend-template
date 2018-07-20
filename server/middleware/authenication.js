import bcrypt from "bcrypt";

const MAX_PASSWORD_LENGTH = 72;
const validatePassword = plain => {
  if (
    plain &&
    typeof plain === "string" &&
    plain.length <= MAX_PASSWORD_LENGTH
  ) {
    return true;
  } else {
    if (plain.length > MAX_PASSWORD_LENGTH) {
      throw new Error("Password too long", 422);
    } else {
      throw new Error("Invalid password", 422);
    }
  }
};

export default {
  hashPassword: plain => {
    validatePassword(plain);
    let salt = bcrypt.genSaltSync(10);
    return {
      password: bcrypt.hashSync(plain, salt),
      salt: salt
    };
  }
};
