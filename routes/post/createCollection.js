const verify = require("../../utils/verify"),
  userModel = require("../../models/user.model");

module.exports = {
  method: "post",
  endpoint: "/createCollection",
  about: "Endpoint to create a collection",
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
        let query = { username: verifToken },
          data = { collection: req.body.data };
        await userModel.findOneAndUpdate(
          query,
          { $push: data },
          { upsert: true }
        );

        res.status(200).json({
          code: 200,
          status: "Collection created in database",
        });
      } catch (err) {
        console.error(err);
      }
    }
  },
};
