const joi = require("joi");
const { Customer }  = require("../models/Customer");

function validateCustomer(customer) {
  const schema = {
    name: joi.string().min(5).max(50).required(),
    phone: joi.string().min(10).max(20).required(),
    isGold: joi.boolean()
  };
  return joi.validate(customer, schema);
}

module.exports = {
  async getAllCustomers(req, res) {
    const customers = await Customer.find();
    res.send(customers);
  },
  async getCustomerById(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customer.findById(id);
      res.send(customer);
    } catch (error) {
      console.log(error);
      res.status(404).send("Customer withthe given ID does not exist");
    }
  },
  async createCustomer(req, res) {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {

      const customer = await new Customer({
        name: req.body.name,
        phone: req.body.phone
      }).save();
      res.send(customer);
    } catch (error) {
      res.status(404).send("Customer was not created");
    }
  },
  async deleteCustomer(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByIdAndRemove(id);
      res.send(customer);
    } catch (error) {
      console.log(error);
      res.status(404).send("Customer withthe given ID does not exist");
    }
  },
  async updateCustomer(req, res) {
      try {
          const { id } = req.params;
          let customer = await Customer.findByIdAndUpdate(id, req.body, {new: true})
          res.send(customer);
      } catch (error) {
          console.log(error);
          res.status(404).send("Customer withthe given ID does not exist");
      }
  }
};
