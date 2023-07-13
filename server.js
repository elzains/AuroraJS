const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  host: "localhost",
  database: "knnjs",
  user: "root",
  password: ""
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected...");

  app.get("/", (req, res) => {
    const sql = "SELECT * FROM datasets";
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Hasil Database -> ", result);
      res.render("index", { datas: result, title: "Datasets" });
    });
  });

  app.post("/tambah", (req, res) => {
    const insertSql = `INSERT INTO datasets (rumah, latitude, longitude, lokasi) VALUES ('${req.body.rumah}','${req.body.latitude}', '${req.body.longitude}', '${req.body.lokasi}')`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(8000, () => {
  console.log("Server ready...");
});
