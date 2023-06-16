import { Schema, model } from "mongoose";
import { cowBreed, cowCategory, cowLabel, cowLocation } from "./cow.constant";
import { CowModel, ICow } from "./cow.interface";
const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
      enum: cowLocation,
    },
    breed: {
      type: String,
      required: true,
      enum: cowBreed,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: false,
      enum: cowLabel,
    },
    category: {
      type: String,
      required: true,
      enum: cowCategory,
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

cowSchema.pre("save", function (next) {
  this.label = cowLabel[0];
  next();
});

export const Cow = model<ICow, CowModel>("Cow", cowSchema);
