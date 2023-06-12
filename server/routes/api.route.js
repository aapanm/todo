import express from "express";
import { getApiData, postApiData } from "../controller/api.controller.js";
const route = express.Router();

route.get("/data", getApiData);
route.post("/data", postApiData);

export default route;
