const mongoose = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid.v4(),
    },
    name: {
      required: true,
      type: String,
    },
    document: {
      required: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model("cerelepe", userSchema);
