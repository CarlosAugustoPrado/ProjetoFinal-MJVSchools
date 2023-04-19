import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const check = { message: "Aplicação funcionando com sucesso!" };
  res.send(check);
});
router.get("/health", (req: Request, res: Response) => {
  const check = { message: "Aplicação funcionando com sucesso!" };
  res.send(check);
});

export default router;
