import BookRepository from "../repositories/book.repository";
import { IBook } from "../models/book.model";

class BooksService {
  getAll() {
    return BookRepository.getAll();
  }
  getByISBN(ISBN: string) {
    return BookRepository.getByISBN(ISBN);
  }
  create(book: IBook) {
    return BookRepository.create(book);
  }
  remove(ISBN: string) {
    return BookRepository.remove(ISBN);
  }
  update(ISBN: string, book: Partial<IBook>) {
    return BookRepository.update(ISBN, book);
  }
}

export default new BooksService();
