var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const config = require("config");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var employeeRoutes = require("./routes/EmployeeRoutes");
//var ItemRouter = require("./routes/Item");
var app = express();
const mongoose = require("mongoose");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const db = config.get("mongoUri");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("server connected");
  })
  .catch(() => console.log("server error"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/employee", employeeRoutes);
//app.use("/item", ItemRouter);

// catch 404 and forward to error handler
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running at port ${port}`));
