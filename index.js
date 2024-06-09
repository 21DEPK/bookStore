import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files
app.use(express.static(join(__dirname, "dist")));

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 8080;
const URI = process.env.MONGO_URL;
const LOCAL_PC = process.env.LOCAL_PC;

// connect to mongoDB

async function main() {
  if (LOCAL_PC) {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookStore");
    console.log("Local MongoDB Server Connected.");
  } else {
    await mongoose.connect(URI);
    console.log("Cloud MongoDB Server Connected.");
  }
}

main().catch((e) => {
  console.log("Error while Connecting to DB: ", e);
});

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
