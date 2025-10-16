import express from "express";
import { login, handleLogin, logOut } from "../controllers/auth.js";
import { userIsLogin } from "../middleware/auth.js";
import pool from "../models/dbpostgres.js";
import {
  addProject,
  deleteProject,
  projects,
  updateProject,
} from "../controllers/projects.js";
import { uploadProjects } from "../middleware/fileUpload.js";

const projectRouter = express.Router();

projectRouter.get("/", userIsLogin, projects);
projectRouter.post(
  "/",
  userIsLogin,
  uploadProjects.single("imageProject"),
  addProject
);
projectRouter.delete("/:id", userIsLogin, deleteProject);
projectRouter.put(
  "/:id",
  userIsLogin,
  uploadProjects.single("imageProject"),
  updateProject
);

export default projectRouter;
