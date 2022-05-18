import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ValidationError as Validation } from "../dto/ValidationError";
import { HTTP400Error } from "../utils/httpErrors";

function validateDto<T>(type: any): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const validationErrors = errors.map((error: ValidationError) => {
          return new Validation(
            error.property,
            Object.values(error.constraints)
          );
        });

        next(new HTTP400Error(validationErrors));
      } else {
        next();
      }
    });
  };
}

export default validateDto;
