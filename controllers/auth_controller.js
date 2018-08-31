const _ = require("lodash");
const { User, validateLogin, comparePasswords } = require("../models/User");

module.exports = {
  async loginUser(req, res) {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");
    const isValidPassword = await comparePasswords(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send("Invalid email or password");
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));;
  }
};
