/**
 * 用户模块
 */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,

    profile: {
      name: String
    }
  },
  { timestamps: true }
);

/**
 * 密码 hash 中间处理
 */
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) next(err);
    user.password = hash;
    next();
  });
});

/**
 * 密码 校验
 */
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
// exports.
