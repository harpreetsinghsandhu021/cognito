import { Router } from "express";
import {
  getSearchResults,
  getSummary,
  getPaper,
  getHTML,
} from "../controller/paperController";

const paperRoutes = Router();

paperRoutes.route("/getMarkup").get(getHTML);

paperRoutes.route("/:id").get(getPaper);

paperRoutes.route("/search/semantic").get(getSearchResults);

paperRoutes.route("/summary/:id").get(getSummary);

export default paperRoutes;
