import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { AppController } from "./app.controller";

async function bootstrap() {
    const appModule = await NestFactory.createApplicationContext(AppModule);
    const Controller = await appModule.get(AppController);
    await Controller.downloadPlaylist(
        "https://www.youtube.com/playlist?list=PL7JTTU0kwXgtXtUaKT5E6-0fqrw2H5Q98",
    );
    Logger.log(`🚀 Application is running`);
}
bootstrap().catch((err) => console.error(err));
