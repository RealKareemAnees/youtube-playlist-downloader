"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _common = require("@nestjs/common");
async function bootstrap() {
    const appModule = await _core.NestFactory.createApplicationContext(_appmodule.AppModule);
    _common.Logger.log(`🚀 Application is running`);
}
bootstrap();

//# sourceMappingURL=main.js.map