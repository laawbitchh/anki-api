const verify = require("../../utils/verify"),
  userModel = require("../../models/user.model");

module.exports = {
  method: "post",
  endpoint: "/getAllCards",
  about: "Endpoint to get all cards from a collection",
  exec: async (req, res) => {
    if (!req.body) {
      res.status(400).json({
        code: 400,
        status: "No body in req",
      });
      return;
    }
    console.log(req.body);
    let verifToken = await verify(req.body.token);
    if (verifToken == false) {
      res.status(403).json({
        code: 403,
        status: "Wrong token",
      });
      return;
    } else {
      try {
        let data = await userModel.findOne({ username: verifToken });

        for (i = 0; i < data.collection.length; i++) {
          if (data.collection[i].name == req.body.target) {
            res.status(200).json({
              code: 200,
              status: "Cards found in database",
              data: data.collection[i].cards,
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  },
};
