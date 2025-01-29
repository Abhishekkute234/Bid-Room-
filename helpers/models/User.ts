import mongoose, { Document, Schema } from "mongoose";

// Define the base interface for user data
export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: Date;
}

// Define the schema without the circular reference
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please enter a valid phone number"],
  },
  createdAt: { type: Date, default: Date.now },
});

// Define the document type after the schema
export type UserDocument = Document & IUser;

// Create and export the model
const User = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);
export default User;
