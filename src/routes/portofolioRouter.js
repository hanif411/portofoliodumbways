import express from "express";
import { login, handleLogin, logOut, portofolio, register, handleRegister } from "../controllers/auth.js";
import { userIsLogin } from "../middleware/auth.js";
import pool from "../models/dbpostgres.js";

const portofolioRouter = express.Router();

portofolioRouter.get("/", portofolio);
portofolioRouter.get("/login", login);
portofolioRouter.post("/login", handleLogin);
portofolioRouter.post("/logout", logOut);
// portofolioRouter.get("/register", register)
// portofolioRouter.post("/register", handleRegister)

export default portofolioRouter;
