import authConfig from '@config/auth.config';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IDecodedToken {
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction,
): Response<unknown> | void {
  const { authorization: authHeader } = request.headers;
  if (!authHeader) {
    throw new AppError('Missing authorization header', 401);
  }
  try {
    const [, token] = authHeader.split(' ');
    const decodedToken = verify(token, authConfig.jwt.secret);
    request.user = {
      id: (decodedToken as IDecodedToken).sub,
    };
  } catch {
    throw new AppError('Invalid authorization header', 401);
  }
  return next();
}
