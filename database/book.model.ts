import { Schema, models, model, Document } from "mongoose";

interface IBook extends Document {
  user: Schema.Types.ObjectId;
  key: string;
  title: string;
  subtitle: string;
  cover_i: string;
  author_name: string[];
  publish_date: Date;
  language: string;
  ratings_count: string;
  subjects: string[];
}

const bookSchema = new Schema<IBook>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  key: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  cover_i: { type: String },
  author_name: [{ type: String }],
  publish_date: { type: Date },
  language: { type: String },
  ratings_count: { type: String },
  subjects: [{ type: String }],
});

const Book = models.Book || model<IBook>("Book", bookSchema);

export default Book;
