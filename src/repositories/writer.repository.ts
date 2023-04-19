import { IWriter, Writer } from "../models/writer.model";

class WriterRepository {
  getAll() {
    return Writer.find();
  }
  getByDocument(document: string) {
    return Writer.findOne({ document: document });
  }
  create(writer: IWriter) {
    return Writer.create(writer);
  }
  update(document: string, writer: Partial<IWriter>) {
    return Writer.updateOne({ document: document }, { $set: writer });
  }
  remove(document: string) {
    return Writer.deleteOne({ document: document });
  }
}

export default new WriterRepository();
