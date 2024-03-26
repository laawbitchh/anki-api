const userModel = require("../../models/user.model"),
  jwt = require("jsonwebtoken");

module.exports = {
  method: "post",
  endpoint: "/login",
  about: "Endpoint to log to your account",
  exec: async (req, res) => {
    if (!req.body) {
      res.status(400).json({
        code: 400,
        status: "No body in req",
      });
      return;
    }

    await userModel.find({ username: req.body.username }).then((resp) => {
      if (req.body.password != resp[0].password) {
        res.status(403).json({
          code: 403,
          status: `Wrong password for ${req.body.username}`,
        });
        return;
      } else {
        let token = jwt.sign(
          {
            data: req.body.username,
          },
          "spikeLeGoat"
        );
        console.log(token);
        res.status(200).json({
          code: 200,
          status: `Good password for ${req.body.username}`,
          token: token,
        });
        return;
      }
    });
  },
};
