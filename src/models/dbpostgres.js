import pg from "pg";

const { Pool } = pg;

const config = {
    connectionString: process.env.DATABASE_URL, 
};

if (process.env.DATABASE_URL) {
    config.ssl = {
        rejectUnauthorized: false
    };
}

const pool = new Pool(config);

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.log("gagal konek ke database " + err.stack);
  } else {
    console.log("berhasil konek ke database " + result.rows[0].now);
  }
});

export default pool;
