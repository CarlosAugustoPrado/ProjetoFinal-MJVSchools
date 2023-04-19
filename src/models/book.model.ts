import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface IBook {
  name: string;
  ISBN: string;
  páginas: number;
  autor: string;
  gênero: string;
  createdAt: String | Date;
}

export const bookSchema = new Schema<IBook>({
  name: String,
  ISBN: String,
  páginas: Number,
  autor: String,
  gênero: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Book = mongoose.model<IBook>("Book", bookSchema);
