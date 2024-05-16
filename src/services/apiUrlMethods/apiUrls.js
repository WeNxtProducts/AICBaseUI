import GET_API_URL from "./getApiConfig";
import POST_API_URL from "./postApiConfig";
import PUT_API_URL from "./putApiConfig.js";
import DELETE_API_URL from "./deleteApiConfig.js";

export const API_CONFIG = {
  ...GET_API_URL,
  ...POST_API_URL,
  ...PUT_API_URL,
  ...DELETE_API_URL,
};
