import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dataBaseConnection } from "./db/connection.js";
import { postRouter } from "./routes/post.js";
import { userRouter } from "./routes/auth.js";
import { markRouter } from "./routes/bookMark.js";
import { storyRouter } from "./routes/story.js";
import { cleanupOldStories } from "./controllers/story.js";
import cron from "node-cron";
const app = express();
const portNumber = 8200;
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dataBaseConnection();
app.use("/api/v1/post", postRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/bookmark", markRouter);
app.use("/api/v1/story", storyRouter);

cron.schedule("*/2 * * * *", async () => {
  console.log("[CRON] Running 2 min story cleanup...");
  await cleanupOldStories();
});

app.listen(portNumber, () => {
  console.log(`SERVER IS CONNECTED TO PORT ${portNumber}`);
});
