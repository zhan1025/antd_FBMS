const UserModel = require('../models/User');

/**
 * POST /sign-in
 * 用户登录
 */
const postSignIn = async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) return res.send({ code: -1, msg: '用户名或密码错误' });

  user.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return next(err);

    if (!isMatch) return res.send({ code: -1, msg: '用户名或密码错误' });

    res.send({ code: 0, msg: 'ok', data: { email: user.email } });
  });
};

/**
 * POST /sign-up
 * 用户注册
 */
const postSignUp = async (req, res, next) => {
  const user = new UserModel({
    email: req.body.email,
    password: req.body.password
  });

  const existingUser = await UserModel.findOne({ email: req.body.email });
  if (existingUser) return res.send({ code: -1, msg: '用户已存在' });

  await user.save();
  res.send({ code: 0, msg: '注册成功' });
};

module.exports = {
  postSignIn,
  postSignUp
};
