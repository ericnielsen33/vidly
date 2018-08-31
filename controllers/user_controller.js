const _ = require("lodash");
const { User, hashPassword, validateUser } = require("../models/User");

module.exports = {
  async createUser(req, res) {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists");
    const hashedPassowrd = await hashPassword(req.body.password);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassowrd
    });
    user = await user.save();
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  },
  async getCurrentUser(req, res) {
    const user = await User.findById(req.user._id);
    res.send(_.pick(user, ["_id", "name", "email"]));
  }
};
