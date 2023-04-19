import { IBook, Book } from "../models/book.model";

class BookRepository {
  getAll() {
    return Book.find();
  }
  getByISBN(ISBN: string) {
    return Book.findOne({ ISBN: ISBN });
  }
  create(book: IBook) {
    return Book.create(book);
  }
  update(ISBN: string, book: Partial<IBook>) {
    return Book.updateOne({ ISBN: ISBN }, { $set: book });
  }
  remove(ISBN: string) {
    return Book.deleteOne({ ISBN: ISBN });
  }
}

export default new BookRepository();
