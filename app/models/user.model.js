const mongoose = require("mongoose");


const documentSchema = mongoose.Schema({
  DNI: String,
  CI: String,
  SS: String,
  NIT: String

});


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    document : [documentSchema],
  

    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
