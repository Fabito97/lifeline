import type { NextFunction, Request, Response } from "express";
import env from "../config/env";
import { errorResponse } from "../utils/responseHandler";

type ErrorWithStatus = Error & {
  status?: number;
  statusCode?: number;
  errors?: any;
};

export const errorHandler = (
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal server error";
  const errors =
    err.errors ?? (env.nodeEnv !== "production" ? { stack: err.stack } : null);

  console.error("[GlobalErrorHandler]", status, message);
  if (env.nodeEnv !== "production" && err.stack) {
    console.error(err.stack);
  }

  return res.status(status).json(errorResponse(message, errors));
};
