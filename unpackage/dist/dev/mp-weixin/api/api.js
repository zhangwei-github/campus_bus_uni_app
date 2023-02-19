"use strict";
const utils_http = require("../utils/http.js");
const insertData = (data, path) => {
  return utils_http.service({
    url: "http://localhost:8080" + path,
    method: "post",
    data
  });
};
const getDataParam = (data, path) => {
  return utils_http.service({
    url: "http://localhost:8080" + path,
    method: "get",
    data
  });
};
exports.getDataParam = getDataParam;
exports.insertData = insertData;
