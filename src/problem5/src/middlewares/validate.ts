import Joi, { SchemaMap } from 'joi';
import httpStatus from 'http-status';
import pick from '../utils/pick';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to validate the request against a given schema.
 * @param schema - The schema object to validate against.
 * @returns A middleware function that validates the request.
 */
const validate = (schema: SchemaMap) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);

  const object = pick(req, Object.keys(validSchema));

  // Check if the body is empty
  if (object.body && Object.keys(object.body).length === 0) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ errors: [{ message: 'Request body cannot be empty', path: ['body'] }] });
  }

  // Validate the request
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  // If there is an error, return the error messages
  if (error) {
    const errorMessages = error.details.map((detail) => ({
      message: detail.message,
      path: detail.path,
    }));
    return res.status(httpStatus.BAD_REQUEST).json({ errors: errorMessages });
  }

  // Assign the value to the request
  Object.assign(req, value);
  return next();
};

export { validate };
