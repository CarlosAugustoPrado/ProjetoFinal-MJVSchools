import { Request, Response, Router } from "express";
import WritersService from "../services/writers.service";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";

const router = Router();

router.get(
  "/",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const writers = await WritersService.getAll();
    res.send(writers);
  }
);

router.get(
  "/:document",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const writer = await WritersService.getByDocument(req.params.document);
    if (!writer)
      return res.status(400).send({ message: "Escritor não encontrado" });
    res.status(200).send(writer);
  }
);

router.post(
  "/",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    await WritersService.create(req.body);
    res.status(201).send({ message: "Escritor cadastrado com sucesso!" });
  }
);

router.post("/authorization", async (req: Request, res: Response) => {
  try {
    const token = await WritersService.authorization(
      req.body.document,
      req.body.password
    );
    res.status(200).send({ token });
  } catch (error: any) {
    res.status(401).send({ message: error.message });
  }
});

router.delete(
  "/remove/:document",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    try {
      await WritersService.remove(req.params.document);
      res.status(200).send({ message: "Escritor removido com sucesso!" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
);

router.put(
  "/:document",
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    try {
      await WritersService.update(req.params.document, req.body);
      res
        .status(200)
        .send({ message: "Dados do escritor atualizados com sucesso!" });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
);

export default router;
