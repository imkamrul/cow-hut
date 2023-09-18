import { Schema, model } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: true,
    },
    img_url: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isNew: {
      type: Boolean,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    total_sell: {
      type: Number,
      required: false,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function (next) {
  this.total_sell = 0;
  next();
});
export const Product = model<IProduct, ProductModel>("Product", productSchema);
