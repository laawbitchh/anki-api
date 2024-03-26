const userModel = require("../../models/user.model"),
  jwt = require("jsonwebtoken");

module.exports = {
  method: "post",
  endpoint: "/register",
  about: "Endpoint to create an account",
  exec: async (req, res) => {
    if (!req.body) {
      res.status(400).json({
        code: 400,
        status: "No body in req",
      });
      return;
    }

    if (!req.body.password) {
      res.status(400).json({
        code: 400,
        status: "No password in req body",
      });
      return;
    }

    let verifUsername = await userModel.find({ username: req.body.username });
    if (verifUsername.length > 0) {
      res.status(400).json({
        code: 400,
        status: "Username is already used",
      });
      return;
    }

    let newUser = new userModel({
      username: req.body.username,
      password: req.body.password,
    });

    newUser.save();
    let token = jwt.sign(
      {
        data: req.body.username,
      },
      "spikeLeGoat"
    );
    console.log(token);
    res.status(200).json({
      code: 200,
      status: "New user created",
      token: token,
    });
  },
};
