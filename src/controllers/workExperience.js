import pool from "../models/dbpostgres.js";

export const works = (req, res) => {
  res.render("addWork");
};

export const addWork = async (req, res) => {
  const {
    jobTitle,
    companyName,
    startDate,
    endDate,
    description,
    technologies,
  } = req.body;
  const imageWork = req.file.filename;

  let technologiesArray = technologies.split(",");
  let descriptionArray = description.split("\n");

  try {
    const query = {
      text: "INSERT INTO work_experiences(job_title, company_name, start_date, end_date, description, technologies, image_url) VALUES($1, $2,$3, $4, $5, $6, $7)",
      values: [
        jobTitle,
        companyName,
        startDate,
        endDate,
        descriptionArray,
        technologiesArray,
        imageWork,
      ],
    };

    const addWork = await pool.query(query);

    if (addWork) {
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);

    return res.redirect("/");
  }
};

export const deleteWork = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await pool.query(
      `DELETE FROM work_experiences WHERE id=${id}`
    );
    if (data.rowCount > 0) {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateWork = async (req, res) => {
  const id = req.params.id;

  const {
    jobTitle,
    companyName,
    startDate,
    endDate,
    description,
    technologies,
  } = req.body;
  const imageWork = req.file.filename;

  const technologiesArray = technologies.split(",");
  const descriptionArray = description.split("\n");

  try {
    const query = {
      text: `UPDATE work_experiences SET job_title = $1, company_name = $2, start_date = $3, end_date = $4, description = $5, technologies = $6, image_url = $7 WHERE id = $8`,
      values: [
        jobTitle,
        companyName,
        startDate,
        endDate,
        descriptionArray,
        technologiesArray,
        imageWork,
        id,
      ],
    };
    const updateResult = await pool.query(query);

    if (updateResult.rowCount > 0) {
      return res.redirect("/");
    } else {
      console.log(
        `Pengalaman kerja dengan ID ${id} tidak ditemukan untuk diupdate.`
      );
      return res.redirect("/");
    }
  } catch (error) {
    console.error("Error saat mengupdate work experience:", error.message);
    return res.redirect("/");
  }
};
