require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const app = express();

const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
app.use(express.json());

// Cors middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Store session on db
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
  dbName: process.env.MONGODB_NAME,
  collectionName: "sessions",
  autoRemoveInterval: 1440, // 1 day in mins
});

// Config sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.get("/sessionData", (req, res) => {
  if (!req.session.userId) return res.send({});
  res.send({ userId: req.session.userId, username: req.session.username });
});

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const readFilesRoute = require("./routes/readFiles");
const openFilesRoute = require("./routes/openFile");
const createFileRoute = require("./routes/createFile");
const logOutRoute = require("./routes/logout");
const saveFileRoute = require("./routes/saveFile");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/readFiles", readFilesRoute);
app.use("/openFile", openFilesRoute);
app.use("/createFile", createFileRoute);
app.use("/saveFile", saveFileRoute);
app.use("/logout", logOutRoute);

app.get("*", (_, res) => {
  res.status(404).send("<h1>404 not found</h1>");
});
