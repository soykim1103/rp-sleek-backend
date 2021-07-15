import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const Admin = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    // if route is protected, there is a admin set in auth.middleware
    if (!!req.admin) {
      return !!data ? req.admin[data] : req.admin;
    }

    // in case a route is not protected, we still want to get the optional auth admin from jwt
    const token = req.headers.authorization
      ? (req.headers.authorization as string).split(" ")
      : null;
    if (token && token[1]) {
      const decoded: any = jwt.verify(token[1], JWT_SECRET);
      return !!data ? decoded[data] : decoded.admin;
    }
  }
);
