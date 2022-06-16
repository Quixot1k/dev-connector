import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import reg from "./routes/api/reg.js";
import login from "./routes/api/login.js";
import profile from "./routes/api/profile.js";
import posts from "./routes/api/posts.js";
// config
const app = express();
const PORT = process.env.PORT || 5001;

// mongodb
connectDB();

// middlewares
app.use(express.json());

// routes
app.use("/api/reg", reg);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// listen
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
