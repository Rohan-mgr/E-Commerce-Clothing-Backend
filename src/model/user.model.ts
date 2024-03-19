import { Schema, Model, model } from "mongoose";

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobile: number;
  shippingAddress?: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: number;
    country: string;
  };
}

const userSchema = new Schema<User, Model<User>>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      address1: {
        type: String,
        required: true,
      },
      address2: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
