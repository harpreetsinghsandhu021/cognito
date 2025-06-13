import { Router } from "express";
import {
  getSearchResults,
  getSummary,
  getPaper,
  getHTML,
  getHomePageData,
  getRelatedPapers,
} from "../controller/paperController";

const paperRoutes = Router();

paperRoutes.route("/getMarkup").get(getHTML);
paperRoutes.route("/getHomeData").get(getHomePageData);
paperRoutes.route("/getRelatedPapers/:id").get(getRelatedPapers);

paperRoutes.route("/:id").get(getPaper);

paperRoutes.route("/search/semantic").get(getSearchResults);

paperRoutes.route("/summary/:id").get(getSummary);

export default paperRoutes;
