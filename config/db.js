const { Sequelize } = require("sequelize");
module.exports = new Sequelize("codegig", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
