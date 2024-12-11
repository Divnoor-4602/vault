import { Schema, Document, model, models } from "mongoose";

interface IUser extends Document {
  clerk_id: string;
  username: string;
  email: string;
  books: Schema.Types.ObjectId[];
  image_url?: string;
  preferences?: {
    genres: string[];
    auhtors: string[];
    books: Schema.Types.ObjectId[];
  };
}

const userSchema = new Schema<IUser>(
  {
    clerk_id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    image_url: { type: String },
    preferences: {
      genres: [{ type: String }],
      authors: [{ type: String }],
      books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
