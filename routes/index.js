import express from "express";
import Auth from "./auth.js";

const app = express();
app.disable("x-powered-by");

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Welcome to API homepage!",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

app.use("/auth", Auth);

export default app;
