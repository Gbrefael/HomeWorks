const express = require("express");
const app = express();
const port = 4000;
const mysql = require("mysql");
const { join } = require("path");
const { render } = require("ejs");

app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");

const bodyParser = require("body-parser");
const { Agent } = require("http");
const e = require("express");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees_db",
});

// Insert employee
app.post("/insertEmp", (req, res) => {
  let { name, position, salary } = req.body;
  let query = `INSERT INTO employees (\`name\`, \`position\`, \`salary\`) VALUES
("${name}", "${position}", ${salary});`;

  connection.query(query, (err, result) => {
    if (err) console.log(err);
  });

  res.redirect("/employees");
});

// update employee
app.post("/update/:id", (req, res) => {
  let id = req.params.id;
  let { title, body, price, catagory } = req.body;

  let query = `UPDATE employees 
  SET \`name\` = "${name}", \`position\` ="${position}", \`salary\`=  ${salary}
  WHERE \`id\` = ${id}
;`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  res.redirect("/employees");
});

app.get("/update/:id", (req, res) => {
  let id = req.params.id;
  let query = `SELECT * FROM employees
  WHERE \`id\` = ${id}
  `;
  connection.query(query, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.render("update.ejs", { result });
  });
});

// delete employee
app.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  let query = `DELETE FROM employees
 WHERE \`id\` =  ${id};
 `;
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  res.redirect("/employees");
});

app.get("/add", (req, res) => {
  res.render("addNew.ejs");
});

app.get("/employees", async (req, res) => {
  let query = `SELECT * FROM employees`;
  await connection.query(query, (err, result) => {
    if (err) console.log(err);

    res.render("index.ejs", { result });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
