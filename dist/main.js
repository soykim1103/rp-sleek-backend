"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const appOptions = {
        cors: true
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, appOptions);
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map