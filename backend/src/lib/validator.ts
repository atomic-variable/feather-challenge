import { InsuranceType, PolicyStatus } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from 'express-validator';

import { buildValidatorErrorResponse } from "../helpers/error-handler";

function validateRequestSchema(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(buildValidatorErrorResponse(req, res, errors.array()));
    }
    return next();
}

const SEARCH_POLICY_REQUEST_VALIDATOR = [
    body('insuranceType')
        .optional()
        .isArray().withMessage('SEARCH_POLICIES.VALIDATION_ERROR.INVALID_INSURANCE_TYPE_TYPE')
        .isIn(Object.keys(InsuranceType)).withMessage('SEARCH_POLICIES.VALIDATION_ERROR.INVALID_INSURANCE_TYPE_VALUE'),
    body('policyStatus')
        .optional()
        .isArray().withMessage('SEARCH_POLICIES.VALIDATION_ERROR.INVALID_INSURANCE_TYPE_TYPE')
        .isIn(Object.keys(PolicyStatus)).withMessage('SEARCH_POLICIES.VALIDATION_ERROR.INVALID_INSURANCE_TYPE_VALUE'),
    body('value')
        .optional()
        .isString().withMessage('SEARCH_POLICIES.VALIDATION_ERROR.INVALID_VALUE_TYPE')
        .escape().trim(),
    body('field')
        .optional()
        .isString().withMessage('SEARCH_POLICIES.VALIDATION_ERROR.INVALID_FIELD_TYPE')
        .escape().trim()
]

export {
    validateRequestSchema,

    SEARCH_POLICY_REQUEST_VALIDATOR
}
