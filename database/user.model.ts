import { Schema, Document, model, models } from "mongoose";

interface IUser extends Document {
  clerk_id: string;
  username: string;
  email: string;
  books: Schema.Types.ObjectId[];
  image_url?: string;
}

const userSchema = new Schema<IUser>(
  {
    clerk_id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    image_url: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
