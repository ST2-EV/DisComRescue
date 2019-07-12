const mongoose = require("mongoose");

const BlockchainSchema = new mongoose.Schema({
  index: {
    type: Number
  },
  time: {
    type: Number
  },
  locations: {
    type: [String]
  },
  message: {
    type: String
  },
  nounce: {
    type: Number
  },
  prehash: {
    type: String
  }
});

module.exports = Blockchain = mongoose.model("blockchain", BlockchainSchema);
