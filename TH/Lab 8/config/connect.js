const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://tranquangdang21:tranquangdang21@lab9.wnmzwqi.mongodb.net/DB?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDb;
