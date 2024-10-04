import express from "express";
import URLController from "../controllers/url.controller";
import Middleware from "../middleware";
import { validateNewURL } from "../middleware/validators/NewURLValidator";

const router = express.Router();

router.post(
  "/createUrl",
  validateNewURL,
  Middleware.ValidationResponse.validateResult,
  URLController.createURL
);

router.get("/getUrlById/:id", URLController.getURLById);

router.get("/getAllUrls", URLController.getAllURLs);

router.delete("/deleteUrl/:id", URLController.deleteURL);

export default router;
