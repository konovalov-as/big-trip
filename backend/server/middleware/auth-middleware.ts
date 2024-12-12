import { ApiError } from '@exceptions/api-error';
import { HttpMethod } from '@utils/const';
import type { Request, Response, NextFunction } from 'express';

const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  try {
    if (request.method === HttpMethod.OPTIONS) {
      next();
    }
    const basicAuthorizationHeader = request.headers['basic-authorization'];

    if (!basicAuthorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = basicAuthorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    // const decodedData = jwt.verify(token, secret)
    // request.user = decodedData

    next();
  } catch (error) {
      return next(ApiError.UnauthorizedError());
  }
}

export {
  authMiddleware,
};


// const jwt = require('jsonwebtoken')

// module.exports = function (req, res, next) {
//     if (req.method === "OPTIONS") {
//         next()
//     }
//     try {
//         const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
//         if (!token) {
//             return res.status(401).json({message: "Не авторизован"})
//         }
//         const decoded = jwt.verify(token, process.env.SECRET_KEY)
//         req.user = decoded
//         next()
//     } catch (e) {
//         res.status(401).json({message: "Не авторизован"})
//     }
// };