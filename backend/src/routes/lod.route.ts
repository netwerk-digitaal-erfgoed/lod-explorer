import express from "express";
import LodController from "../controllers/lod.controller";

import Middleware from "../middleware";
import { validateNewClassToDomain } from "../middleware/validators/NewClassToDomain";
import { validateQueryParams } from "../middleware/validators/QueryParams";
import { validateQuerySingleParams } from "../middleware/validators/SingleQueryParams";

const router = express.Router();

router.post(
  "/joinIds",
  validateNewClassToDomain,
  Middleware.ValidationResponse.validateResult,
  LodController.createClassToDomain
);

router.get("/getDynamicData/:id", LodController.getDynamicData);

router.get("/getDomainNames/:id", LodController.getDomainNames);

router.post(
  "/getDynamicData",
  validateQueryParams,
  Middleware.ValidationResponse.validateResult,
  LodController.getDynamicDataByName
);

router.post(
  "/getSingleDynamicData",
  validateQuerySingleParams,
  Middleware.ValidationResponse.validateResult,
  LodController.getSingleDynamicDataByName
);

export default router;
