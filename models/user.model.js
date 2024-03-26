const mongoose = require("mongoose");

var schema = mongoose.Schema({
  username: String,
  password: {
    type: String,
    required: true,
    suppressReservedKeysWarning: true,
  },
  collection: [
    {
      name: String,
      description: String,
      cards: [
        {
          name: String,
          question: String,
          answer: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("users", schema);
