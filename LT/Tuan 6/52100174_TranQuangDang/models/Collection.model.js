const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Photo",
    },
  ],
});

const PhotoSchema = new Schema({
  name: String,
  url: String,
  img: {
    data: Buffer,
    contentType: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", UserSchema);
const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = {
  User,
  Photo,
};
