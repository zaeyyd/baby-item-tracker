import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import * as functions from "firebase-functions";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json(err.message);
        functions.logger.error(err.message, { structuredData: true });
      } else {
        res.status(500).json({ error: "Unknown Error" });
        functions.logger.error(err, { structuredData: true });
      }
    }
  };

export { validate };
