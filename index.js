const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const sequelize = require("./config/db");

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected.");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//  set static folder

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("index", { layout: "landing" }));

app.use("/gigs", require("./routes/gig"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
