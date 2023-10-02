const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: String,
  sex: String,
  age: Number,
  address: String,
  favourite: [String],
});

const Student = mongoose.model("Student", studentSchema);

studentSchema.methods.getFavourite = function () {
  return this.favourite.join(", ");
};

module.exports = Student;
