import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// api endpoint

app.use("/api/admin", adminRouter);

app.get("/", async (req, res) => {
  res.send("Hello Word ");
});

// start the app
app.listen(port, async () => {
  console.log(`Server is running at ${port}`);
  connectDB();
  connectCloudinary();
});
