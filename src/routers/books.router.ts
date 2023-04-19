import { Request, Response, Router } from "express";
import BooksService from "../services/books.service";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const books = await BooksService.getAll();
  res.send(books);
});

router.get("/:ISBN", async (req: Request, res: Response) => {
  const book = await BooksService.getByISBN(req.params.ISBN);
  if (!book) return res.status(400).send({ message: "Livro não encontrado" });
  res.status(200).send(book);
});

router.post(
  "/",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    await BooksService.create(req.body);
    res.status(201).send({ message: "Livro postado com sucesso!" });
  }
);

router.delete(
  "/remove/:ISBN",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    try {
      await BooksService.remove(req.params.ISBN);
      res.status(200).send({ message: "Livro removido com sucesso!" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
);

router.put(
  "/:ISBN",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    try {
      await BooksService.update(req.params.ISBN, req.body);
      res.status(200).send({ message: "Livro atualizado com sucesso!" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
);

export default router;
