const mongooes = require("mongoose");

function dbConnection() {
  const Db_url = process.env.MONGODB_URL;

  mongooes
    .connect(Db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("db connection established successfully");
    })
    .catch((e) => {
      console.log(e);
    });

  const db = mongooes.Connection;
  //   db.on("error", function () {
  //     console.error.bind(console, "Connection Errors");
  //   });

  //   db.once("open", function () {
  //     console.log("DB Connected !!");
  //   });
}

module.exports = dbConnection;
