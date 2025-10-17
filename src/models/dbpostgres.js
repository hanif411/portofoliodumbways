import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "portofolio",
});

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.log("gagal konek ke database " + err.stack);
  } else {
    console.log("berhasil konek ke database " + result.rows[0].now);
  }
});

export default pool;
