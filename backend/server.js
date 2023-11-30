require("dotenv").config();
const express = require("express");
const { dbConnect } = require("./utiles/db");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/home", require("./routes/home/homeRoutes"));

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/dashboard/categoryRoutes"));
app.use("/api", require("./routes/dashboard/productRoutes"));
app.use("/api", require("./routes/dashboard/sellerRoutes"));

app.get("/", (req, res) => res.send("Hello World!"));

const port = process.env.PORT;
dbConnect();
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
