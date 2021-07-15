"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const http_exception_1 = require("@nestjs/common/exceptions/http.exception");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(UserService) {
        this.UserService = UserService;
    }
    async use(req, res, next) {
        let authHeaders = req.headers.authorization;
        if (authHeaders && authHeaders.split(" ")[1]) {
            const token = authHeaders.split(" ")[1];
            const UserRO = await this.UserService.findByToken(token);
            if (!UserRO || !UserRO.user) {
                throw new http_exception_1.HttpException("Not authorized.", common_1.HttpStatus.UNAUTHORIZED);
            }
            console.log("Found the user:" + JSON.stringify(UserRO));
            req.user = UserRO.user;
            next();
        }
        else {
            throw new http_exception_1.HttpException("Not authorized.", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map