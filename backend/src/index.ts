import express from "express";
import paperRoutes from "./routes/paperRoutes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: true, // or specify your frontend domain
    credentials: true,
    exposedHeaders: ["*"],
  })
);

app.use(express.json());

app.use("/api/v1/papers", paperRoutes);

export default app;
