const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});

userSchema.pre('save', function(next) {
  if (this.password && this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
  next();
});

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Users = mongoose.model('Users', userSchema)

module.exports = Users;
