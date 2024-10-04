import {body, ValidationChain} from "express-validator";

export const validateQuerySingleParams: ValidationChain[] = [
    body("classId")
        .trim()
        .isLength({ min: 1 })
        .withMessage("id for class is required"),
    body("name").trim().isLength({ min: 1 }).withMessage("name is required"),
    body("domainName")
        .isArray()
        .withMessage("domainName should be an array with at least empty")
        .custom((value: any[]) => {
            if (!value.every((item) => typeof item === "string")) {
                throw new Error("domainName should be an array of strings");
            }
            return true;
        }),
];