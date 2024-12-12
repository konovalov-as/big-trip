import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@exceptions/api-error';
import jwt from 'jsonwebtoken';
import { HttpMethod } from '@utils/const';
import { ACCESS_SECRET_KEY } from '@config/app';
import * as console from "console";

const checkRoleMiddleware = (allowedRoles: string[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {

      if (request.method === HttpMethod.OPTIONS) {
        next();
      }
      
      const authorizationHeader = request.headers.authorization;
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
      }

      const accessToken: string = authorizationHeader.split(' ')[1];

      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }
      
      if (!ACCESS_SECRET_KEY) {
        throw new Error('No a secret access key');
      }
      
      const userPayload: any = jwt.verify(accessToken, ACCESS_SECRET_KEY);
      const userRoles = userPayload.roles;

      const upperAllowedRoles: string[] = allowedRoles.map((allowedRole: string) => {
        return allowedRole.toUpperCase();
      })
      
      let hasRole: boolean = false;
      userRoles.forEach((userRole: string) => {
        if (upperAllowedRoles.includes(userRole.toUpperCase())) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return next(ApiError.Forbidden());
      }
      next();
    } catch (error) {
      return next(ApiError.Forbidden());
    }
  }
}

export {
  checkRoleMiddleware,
};

// module.exports = function(role) {
//   return function (req, res, next) {
//       if (req.method === "OPTIONS") {
//           next()
//       }
//       try {
//           const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
//           if (!token) {
//               return res.status(401).json({message: "Не авторизован"})
//           }
//           const decoded = jwt.verify(token, process.env.SECRET_KEY)
//           if (decoded.role !== role) {
//               return res.status(403).json({message: "Нет доступа"})
//           }
//           req.user = decoded;
//           next()
//       } catch (e) {
//           res.status(401).json({message: "Не авторизован"})
//       }
//   };
// }