const verify = require("../../utils/verify"),
  userModel = require("../../models/user.model");

module.exports = {
  method: "post",
  endpoint: "/getAllCollections",
  about: "Endpoint to get all user's collections",
  exec: async (req, res) => {
    if (!req.body) {
      res.status(400).json({
        code: 400,
        status: "No body in req",
      });
      return;
    }

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

        res.status(200).json({
          code: 200,
          status: "Collection found in database",
          data: data.collection,
        });
      } catch (err) {
        console.error(err);
      }
    }
  },
};
