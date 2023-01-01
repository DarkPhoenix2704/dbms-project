import { Router } from "express";
import { create, deleteMemory, get, getAll } from "../controllers/memory";
import patch from "../controllers/memory/patch";

const memoryRouter = Router();

memoryRouter.get("/", getAll);
memoryRouter.get("/:id", get);
memoryRouter.post("/", create);
memoryRouter.patch("/:id", patch);
memoryRouter.delete("/:id", deleteMemory);

export default memoryRouter;
