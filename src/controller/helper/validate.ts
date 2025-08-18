
import { Request } from "express";
import { isNumberString, validate, ValidationError } from "class-validator";
import { ClassType } from "class-transformer-validator";
import { plainToInstance } from "class-transformer";

export interface ValidationErrorResponse {
  validationErrors?: ValidationError[];
}

export type ValidationResult<T> =
  | {
      validatedData: T;
      errors: undefined;
    }
  | {
      validatedData: undefined;
      errors: ValidationErrorResponse;
    };

/**
 * Convert object to the given type.
 * @template T
 * @param request
 * @param convertToType
 * @returns {T} Converted object of the given type if valid
 */
async function validateBodyInput<T>(
  request: Request,

  convertToType: ClassType<T>
): Promise<ValidationResult<T>> {
  const convertedBody = convertBody(request, convertToType);
  return _validate(convertedBody);
}

/**
 * Validate normal object and convert it to the given type if valid.
 * @template T
 * @param normalObject
 * @param convertToType
 * @returns {Promise<ValidationResult<T>>} Promise of validation result object containing validated data and errors
 */
async function validateNormalObject<T>(
  normalObject: object,
  convertToType: ClassType<T>
): Promise<ValidationResult<T>> {
  const convertedBody = plainToInstance(convertToType, normalObject, {
    exposeUnsetFields: true,
  });
  return _validate(convertedBody);
}

/**
 * Validate query input and convert it to the given type if valid.
 * @template T
 * @param {Request} request
 * @param {ClassType<T>} convertToType
 * @returns {Promise<ValidationResult<T>>} Promise of validation result object containing validated data and errors
 */
async function validateQueryInput<T>(
  request: Request,
  convertToType: ClassType<T>
): Promise<ValidationResult<T>> {
  const convertedQuery = convertQuery(request, convertToType);
  return _validate(convertedQuery);
}

/**
 * Validate numeric param.
 * @param {Request} request
 * @param {string} paramName
 * @returns {number} param value as a number
 */
function validateNumericParam(request: Request, paramName: string): number {
  const paramValue = request.params[paramName];
  return isNumberString(paramValue) ? parseInt(paramValue) : 0;
}

/**
 * Convert body to the given type.
 * @template T
 * @param {Request} request
 * @param {ClassType<T>} toType
 * @returns {T} Converted object

 */
function convertBody<T>(request: Request, toType: ClassType<T>): T {
  return convert(request.body, toType);
}

/**
 * Convert query string to the given type.
 * @template T
 * @param {Request} request
 * @param {ClassType<any>} toType
 * @returns {T} Converted object
 */
function convertQuery<T>(request: Request, toType: ClassType<T>): T {
  return convert(request.query, toType);
}

/**
 * Convert object to the given type.
 * @template T
 * @param {any} object
 * @param {ClassType<T>} toType
 * @returns {T} Converted object
 */
function convert<T>(object: any, toType: ClassType<T>): T {
  return plainToInstance(toType, object, { exposeUnsetFields: true });
}

/**
 * Validate object and return the result.
 *
 * @template T
 * @param {T} obj
 * @returns {Promise<ValidationResult<T>>}: Promise of ValidationResult object with validatedData or errors property set.
 */
async function _validate<T>(obj: T): Promise<ValidationResult<T>> {
  const validationErrors = await validate(obj as unknown as object, {
    whitelist: true,
  });
  if (validationErrors.length === 0) {
    return { validatedData: obj, errors: undefined };
  }
  const response: ValidationErrorResponse = { validationErrors };
  return { errors: response, validatedData: undefined };
}

export {
  validateBodyInput,
  validateQueryInput,
  validateNumericParam,
  validateNormalObject,
};
