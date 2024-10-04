import {body, ValidationChain} from "express-validator";

export const validateNewURL: ValidationChain[] = [
    body("prefixName")
        .trim()
        .isLength({ min: 1 })
        .withMessage("prefixName is required"),
    body("prefixURL")
        .trim()
        .isLength({ min: 1 })
        .withMessage("prefixURL is required"),
    body("description")
        .trim()
        .isLength({ min: 1 })
        .withMessage("description is required"),
];
