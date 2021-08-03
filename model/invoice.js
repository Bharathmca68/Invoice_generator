const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema(
  {
    Item_Name: {
      type: String,
      required: true,
      trim: true,
    },
    Price: {
      type: Number,
      required: true,
      trime: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", InvoiceSchema, "Invoice");
