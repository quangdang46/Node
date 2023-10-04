const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
  created_at: Date,
  updated_at: Date,
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
  data: {
    type: Buffer,
    contentType: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: Date,
  updated_at: Date,
});

const User = mongoose.model("User", UserSchema);
const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = {
  User,
  Photo,
};
