"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const corsOrigin = process.env.CORS_ORIGIN ? { origin: process.env.CORS_ORIGIN } : undefined;
    app.enableCors(corsOrigin);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    const port = Number(process.env.PORT ?? 3000);
    await app.listen(port);
    // eslint-disable-next-line no-console
    console.log(`Backend API running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map