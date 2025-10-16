import pool from "../models/dbpostgres.js";

export const projects = (req, res) => {
  res.render("addProject");
};

export const addProject = async (req, res) => {
  const { projectName, description, technologies } = req.body;
  const imageProject = req.file.filename;

  let technologiesArray = technologies.split(",");

  try {
    const query = {
      text: "INSERT INTO projects(project_name, description, technologies, image_url) VALUES($1, $2,$3, $4)",
      values: [projectName, description, technologiesArray, imageProject],
    };

    const addroject = await pool.query(query);
    console.log(addroject);

    if (addroject) {
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);

    return res.redirect("/");
  }
};

export const deleteProject = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await pool.query(`DELETE FROM projects WHERE id=${id}`);
    if (data.rowCount > 0) {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProject = async (req, res) => {
  const id = req.params.id;

  const { projectName, description, technologies } = req.body;
  const imageProject = req.file.filename;
  const technologiesArray = technologies.split(",");

  try {
    const query = {
      text: `UPDATE projects SET project_name = $1, description = $2, technologies = $3, image_url = $4 WHERE id = $5`,
      values: [projectName, description, technologiesArray, imageProject, id],
    };
    const updateResult = await pool.query(query);

    if (updateResult.rowCount > 0) {
      return res.redirect("/");
    } else {
      console.log(`Proyek dengan ID ${id} tidak ditemukan untuk diupdate.`);
      return res.redirect("/");
    }
  } catch (error) {
    console.error("Error saat mengupdate project:", error.message);
    return res.redirect("/");
  }
};
