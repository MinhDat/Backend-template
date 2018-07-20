import VN_MESSAGE from "./vi";
import US_MESSAGE from "./us";
import STATUS_MESSAGES from "./statusMessages";

export default {
  getMessage: (name, type) => {
    if (type == "vi") return VN_MESSAGE[name];
    else return US_MESSAGE[name];
  },
  SALT_WORK_FACTOR: 10,
  MAX_PASSWORD_LENGTH: 72,
  DEFAULT_TOKEN_LEN: 64,
  EXPIRES_TIME: 86400,
  STATUS_MESSAGES
  // getConfig: (name) => {
  //     return CONFIG[name]
  // },
  // getReturnCode: (name) => {
  //     return RETURNCODE[name];
  // },
  // getDefaultvalue: (name) => {
  //     return DEFAULTVALUE[name];
  // },
  // getPaging: (name) => {
  //     return PAGING[name];
  // }
};
