import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface IWriter {
  name: string;
  document: string;
  age: number;
  gênero: string;
  password: string;
  createdAt: String | Date;
}

export const writerSchema = new Schema<IWriter>({
  name: String,
  document: String,
  age: Number,
  gênero: String,
  password: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const Writer = mongoose.model<IWriter>("Writer", writerSchema);
