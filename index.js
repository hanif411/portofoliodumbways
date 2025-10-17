import express from "express";
import { create } from "express-handlebars";
import portofolioRouter from "./src/routes/portofolioRouter.js";
import methodOverride from "method-override";
import pool from "./src/models/dbpostgres.js";
import session from "express-session";
import workRouter from "./src/routes/workExperience.js";
import projectRouter from "./src/routes/projects.js";

const app = express();
const port = 3000;
const hbs = create({
  extname: ".hbs",
  defaultLayout: false,
  partialsDir: "src/views/partials",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static("src/public"));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

app.use("/", portofolioRouter);
app.use("/works", workRouter);
app.use("/projects", projectRouter);

app.listen(port, () => {
  console.log(`aplikasi berjalan di port ${port}`);
});
