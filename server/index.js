import express from "express";
import cors from "cors";
import "dotenv/config";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// api endpoint
app.get("/", async (req, res) => {
  res.send("Hello Word ");
});

// start the app
app.listen(port, async () => {
  console.log(`Server is running at ${port}`);
});
