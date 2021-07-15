import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { NestMiddleware, HttpStatus, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly UserService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(" ")[1]) {
      const token = (authHeaders as string).split(" ")[1];
      const UserRO = await this.UserService.findByToken(token);
      if (!UserRO || !UserRO.user) {
        throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
      }

      console.log("Found the user:" + JSON.stringify(UserRO));

      req.user = UserRO.user;
      next();
    } else {
      throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
    }
  }
}
