import {body, ValidationChain} from "express-validator";

export const validateNewClassToDomain: ValidationChain[] = [
    body("classId")
        .trim()
        .isLength({ min: 1 })
        .withMessage("id for class is required"),
    body("domainId")
        .trim()
        .isLength({ min: 1 })
        .withMessage("id for domain is required"),
    body("hasData").trim().isBoolean().withMessage("hasData is required"),
];