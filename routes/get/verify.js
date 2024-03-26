const jwt = require("jsonwebtoken");

module.exports = {
  method: "get",
  endpoint: "/verify",
  about: "Verify a token",
  exec: async (req, res) => {
    try {
      let verifToken = jwt.verify(req.body.token, "spikeLeGoat");
      res.status(200).json({
        code: 200,
        status: "Good token",
        verifToken,
      });
    } catch (err) {}
  },
};
