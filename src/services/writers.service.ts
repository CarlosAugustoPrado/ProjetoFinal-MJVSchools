import WriterRepository from "../repositories/writer.repository";
import { IWriter } from "../models/writer.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class WritersService {
  getAll() {
    return WriterRepository.getAll();
  }
  getByDocument(document: string) {
    return WriterRepository.getByDocument(document);
  }
  async create(writer: IWriter) {
    if (writer.password) {
      writer.password = await bcrypt.hash(writer.password, 10);
    }
    return WriterRepository.create(writer);
  }

  async authorization(document: string, password: string) {
    const writer = await WriterRepository.getByDocument(document);
    if (!writer) return new Error("Escritor não encontrado!");

    const result = await bcrypt.compare(password, writer.password);

    if (result) {
      return jwt.sign(
        {
          document: writer.document,
          _id: writer._id,
        },
        secretJWT,
        {
          expiresIn: "1h",
        }
      );
    }

    throw new Error("Falha na autenticação.");
  }

  remove(document: string) {
    return WriterRepository.remove(document);
  }

  update(document: string, writer: Partial<IWriter>) {
    return WriterRepository.update(document, writer);
  }
}

export default new WritersService();
