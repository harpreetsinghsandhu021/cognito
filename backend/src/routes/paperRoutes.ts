import { Router } from "express";
import {
  getSearchResults,
  getSummary,
  getPaper,
  getHomePageData,
  getRelatedPapers,
  getCategories,
} from "../controller/paperController";

const paperRoutes = Router();

paperRoutes.route("/getHomeData").get(getHomePageData);
paperRoutes.route("/getRelatedPapers/:id").get(getRelatedPapers);
paperRoutes.route("/allCategories").get(getCategories);
paperRoutes.route("/:id").get(getPaper);
paperRoutes.route("/search/semantic").get(getSearchResults);
paperRoutes.route("/summary/:id").get(getSummary);

export default paperRoutes;
