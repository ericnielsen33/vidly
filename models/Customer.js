const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true
    }
});
const Customer = mongoose.model("Customer", customerSchema);
exports.Customer = Customer;
exports.customerSchema = customerSchema;
