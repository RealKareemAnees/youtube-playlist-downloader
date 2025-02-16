"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _common = require("@nestjs/common");
const _appcontroller = require("./app.controller");
async function bootstrap() {
    const appModule = await _core.NestFactory.createApplicationContext(_appmodule.AppModule);
    const Controller = await appModule.get(_appcontroller.AppController);
    // await Controller.downloadPlaylist(
    //     "https://www.youtube.com/playlist?list=PL7JTTU0kwXgtXtUaKT5E6-0fqrw2H5Q98",
    // );
    Controller.downloadOneVideo("https://www.youtube.com/watch?v=BnTW6fZz-1E&list=PL7JTTU0kwXgtXtUaKT5E6-0fqrw2H5Q98&index=100&pp=iAQB8AUB");
    Controller.getBasicInfo("https://www.youtube.com/watch?v=BnTW6fZz-1E&list=PL7JTTU0kwXgtXtUaKT5E6-0fqrw2H5Q98&index=100&pp=iAQB8AUB");
    _common.Logger.log(`🚀 Application is running`);
}
bootstrap().catch((err)=>console.error(err));

//# sourceMappingURL=main.js.map