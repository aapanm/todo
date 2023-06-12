import express from "express";
import apiRoute from "./routes/api.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
//using routes
app.use(apiRoute);

//index route
app.get("/", (req, res) => {
  res.send("welcome to this project");
});

app.listen(8000, () => {
  console.log(`Server is up at port, 8000`);
});
