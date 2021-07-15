"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
exports.Admin = common_1.createParamDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    if (!!req.admin) {
        return !!data ? req.admin[data] : req.admin;
    }
    const token = req.headers.authorization
        ? req.headers.authorization.split(" ")
        : null;
    if (token && token[1]) {
        const decoded = jwt.verify(token[1], JWT_SECRET);
        return !!data ? decoded[data] : decoded.admin;
    }
});
//# sourceMappingURL=admin.decorator.js.map