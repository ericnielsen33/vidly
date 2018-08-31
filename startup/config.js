const config = require("config");
module.exports = function(params) {
  if (!config.get("jwtPrivateKey")) {
    console.log(" Cannot get config parameter jwtPrivateKey");
    process.exit(1);
  }
};
