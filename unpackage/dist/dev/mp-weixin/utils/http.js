"use strict";
const common_vendor = require("../common/vendor.js");
let server_url = "";
function service(options = {}) {
  options.url = `${server_url}${options.url}`;
  options.header = {
    "content-type": "application/json"
  };
  return new Promise((resolved, rejected) => {
    options.success = (res) => {
      if (Number(res.data.code) == 0) {
        resolved(res.data);
      } else {
        common_vendor.index.showToast({
          icon: "none",
          duration: 3e3,
          title: `${res.data.msg}`
        });
        rejected(res.data.msg);
      }
    };
    options.fail = (err) => {
      rejected(err);
    };
    common_vendor.index.request(options);
  });
}
exports.service = service;
