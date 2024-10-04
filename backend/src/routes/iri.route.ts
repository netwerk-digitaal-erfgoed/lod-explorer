import express from "express";
import IRIController from "../controllers/iri.controller";
import Middleware from "../middleware";
import { validateNewIRI } from "../middleware/validators/NewIRIValidator";

const router = express.Router();

router.post(
  "/createIRI",
  validateNewIRI,
  Middleware.ValidationResponse.validateResult,
  IRIController.createIRI
);

router.get("/getIRIById/:id", IRIController.getIRIById);

router.get("/getIRIByType/:type", IRIController.getIRIByType);

router.get("/getAllIRI", IRIController.getAllURLs);

export default router;
