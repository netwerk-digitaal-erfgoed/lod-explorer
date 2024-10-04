import {body, ValidationChain} from "express-validator";

export const validateNewIRI: ValidationChain[] = [
    body("urlId").trim().isLength({ min: 1 }).withMessage("url id is required"),
    body("name").trim().isLength({ min: 1 }).withMessage("name is required"),
    body("iriType")
        .trim()
        .isLength({ min: 1 })
        .withMessage("iriType is required"),
    body("description")
        .trim()
        .isLength({ min: 1 })
        .withMessage("description is required"),
    body("hasData").trim().isBoolean().withMessage("hasData is required"),
];