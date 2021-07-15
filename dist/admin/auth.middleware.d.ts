import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AdminService } from "./admin.service";
export declare class AuthMiddleware implements NestMiddleware {
    private readonly AdminService;
    constructor(AdminService: AdminService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
