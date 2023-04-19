import { Router } from "express";
import healthRouter from "./health.router";
import booksRouter from "./books.router";
import writersRouter from "./writers.router";

const router = Router();

router.use("/health", healthRouter);
router.use("/books", booksRouter);
router.use("/writers", writersRouter);

export default router;
