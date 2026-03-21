import { Router } from "express";
import * as booksController from "../controllers/booksController";
import { validateId } from "../middlewares/validateId";

const router = Router();

router.get("/", booksController.getAll);
router.get("/:id", validateId, booksController.getById);
router.post("/", booksController.create);
router.put("/:id", validateId, booksController.update);
router.delete("/:id", validateId, booksController.remove);

export default router;