import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
export declare class AuthMiddleware implements NestMiddleware {
    private readonly UserService;
    constructor(UserService: UserService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
