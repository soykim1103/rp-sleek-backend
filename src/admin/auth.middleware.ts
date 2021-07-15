import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { NestMiddleware, HttpStatus, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AdminService } from "./admin.service";
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly AdminService: AdminService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(" ")[1]) {
      const token = (authHeaders as string).split(" ")[1];
      const AdminRO = await this.AdminService.findByToken(token);
      if (!AdminRO || !AdminRO.admin) {
        throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
      }

      console.log("Found the admin:" + JSON.stringify(AdminRO));

      req.admin = AdminRO.admin;
      next();
    } else {
      throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
    }
  }
}
