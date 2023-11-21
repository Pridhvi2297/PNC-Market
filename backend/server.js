require("dotenv").config();
const express = require("express");
const { dbConnect } = require("./utiles/db");
const app = express();
const cros = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cros({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use("/api", require("./routes/authRoutes"));
app.use('/api', require('./routes/dashboard/categoryRoutes'))

app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT;
dbConnect();
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
