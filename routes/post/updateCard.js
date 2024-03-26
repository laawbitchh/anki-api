const verify = require("../../utils/verify"),
  userModel = require("../../models/user.model");

module.exports = {
  method: "post",
  endpoint: "/updateCard",
  about: "Endpoint to update a card from a collection",
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

        for (i = 0; i < data.collection.length; i++) {
          if (data.collection[i].name == req.body.target) {
            for (g = 0; g < data.collection[i].cards.length; g++) {
              if (data.collection[i].cards[g].name == req.body.cardTarget) {
                data.collection[i].cards[g] = req.body.card;
              }
            }
          }
        }
        await userModel.findOneAndUpdate(
          { username: verifToken },
          { collection: data.collection }
        );
        res.status(200).json({
          code: 200,
          status: "Card updated",
        });
      } catch (err) {
        console.error(err);
      }
    }
  },
};
