import { Router } from "express";
import {
  addAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  updateAuthor,
} from "../controllers/author";

const authorRouter = Router();

// GET api/authors
authorRouter.get("/api/authors", getAuthors);

// GET api/authors/:id
authorRouter.get("/api/authors/:id", getAuthorById);

// POST api/authors
authorRouter.post("/api/authors", addAuthor);

// PUT api/authors/:id
authorRouter.put("/api/authors/:id", updateAuthor);

// DELETE // api/authors/:id
authorRouter.delete("/api/authors/:id", deleteAuthor);

export default authorRouter;
