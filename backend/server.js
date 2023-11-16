const express = require("express");
const app = express();
const cros = require("cors");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require("dotenv").config();

app.use(
  cros({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.json())
app.use("/api", require("./routes/authRoutes"));
app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
