import pool from "../models/dbpostgres.js";
import bcrypt from "bcrypt";

export const login = (req, res) => {
  res.render("login");
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const errormessage = "lengkapi semua data";
    return res.render("login", { errormessage });
  }

  try {
    const query = {
      text: `SELECT * FROM users WHERE email=$1`,
      values: [email],
    };
    const data = await pool.query(query);
    const user = data.rows[0];
    if (!user) {
      return res.render("login", {
        errormessage: "Email belum terdaftar",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.user = {
        email: user.email,
      };
      return res.redirect("/");
    }
  } catch (error) {
    console.error("Error saat login:", error.stack);
    return res.render("login", { errormessage: error.stack });
  }
};

export const logOut = (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.render("login", { errormessage: error });
      } else {
        return res.redirect("/");
      }
    });
  } else {
    return res.redirect("/login");
  }
};

export const portofolio = async (req, res) => {
  try {
    const querywork = {
      text: `SELECT * FROM work_experiences`,
    };
    const work = await pool.query(querywork);
    const workExperiences = work.rows;

    const queryproject = {
      text: `SELECT * FROM projects`,
    };
    const project = await pool.query(queryproject);
    const projects = project.rows;

    const tools = [
      "express",
      "nodejs",
      "postgres",
      "reactjs",
      "tailwind",
      "bootstrap",
      "mongodb",
      "mysql",
    ];

    const user = req.session.user ? req.session.user.email : null;

    return res.render("portofolio", {
      workExperiences,
      projects,
      tools,
      user,
    });
  } catch (error) {
    console.error("GET Work Experience Error:", error);
    return res.render("portofolio", { workExperiences: [] });
  }
};

export const register = (req, res) => {
  res.render("register");
};

export const handleRegister = async (req, res) => {
  const { email, password } = req.body;

  if ( !email || !password) {
    const errormessage = "lengkapi semua data";
    return res.render("register", { errormessage });
  }

  try {
    let hashedpassword = await bcrypt.hash(password, 10);
    const query = {
      text: `INSERT INTO public.users("email", "password") VALUES ($1, $2) RETURNING *`,
      values: [email, hashedpassword],
    };
    const data = await pool.query(query);
    const user = data.rows[0];

    if (user) {
      return res.redirect("/login");
    }
  } catch (error) {
    console.error("Error saat registrasi:", error.stack);
  }
};

