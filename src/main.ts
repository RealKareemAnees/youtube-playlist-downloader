import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
    const appModule = await NestFactory.createApplicationContext(AppModule);
    Logger.log(`🚀 Application is running`);
}
bootstrap();
