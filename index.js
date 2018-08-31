require("./startup/config")();
require("./startup/winston");
require("./startup/db")();

const express = require("express");
const app = express();
require("./routes")(app);

process.on("unhandledRejection", (ex) => {
  throw ex
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
