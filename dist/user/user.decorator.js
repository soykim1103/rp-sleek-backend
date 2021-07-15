"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
exports.User = common_1.createParamDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    if (!!req.user) {
        return !!data ? req.user[data] : req.user;
    }
    const token = req.headers.authorization
        ? req.headers.authorization.split(" ")
        : null;
    if (token && token[1]) {
        const decoded = jwt.verify(token[1], JWT_SECRET);
        return !!data ? decoded[data] : decoded.user;
    }
});
//# sourceMappingURL=user.decorator.js.map