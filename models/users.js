const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
  },
  passportID: {
    type: String,
    required: true,
    // validate(value) {
    //   if (!validator.isPassportNumber(value, 'US')) {
    //     throw new Error('must be Israeli Passport');
    //   }
    // },
  },
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    type: Number,
    default: 0,
  },
});

const Users = model('users', userSchema);

// const Accounts = mongoose.model('Accounts', {});

module.exports = Users;
