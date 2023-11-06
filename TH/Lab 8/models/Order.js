const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  total: Number,
  list: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      qty: Number,
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
