import express from "express";
import { userIsLogin } from "../middleware/auth.js";
import pool from "../models/dbpostgres.js";
import {
  addWork,
  deleteWork,
  updateWork,
  works,
} from "../controllers/workExperience.js";
import { uploadWorks } from "../middleware/fileUpload.js";

const workRouter = express.Router();

workRouter.get("/", userIsLogin, works);
workRouter.post("/", userIsLogin, uploadWorks.single("imageWork"), addWork);
workRouter.delete("/:id", userIsLogin, deleteWork);
workRouter.put(
  "/:id",
  userIsLogin,
  uploadWorks.single("imageWork"),
  updateWork
);

export default workRouter;
