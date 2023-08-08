const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const validator = require("fastest-validator");
const { use } = require("../../users");
const v = new validator();

module.exports = async (req, res) => {
  const schema = {
    email: "email|empry:false",
    password: "string|min:6",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    return res.status(404).json({
      status: "erroer",
      message: "user not found",
    });
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      status: "error",
      message: "password not found",
    });
  }
  res.json({
    status: "success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      profession: user.profession,
    },
  });
};
