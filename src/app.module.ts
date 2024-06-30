import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GetVideo } from "./get-video";
import { ConfigModule } from "@nestjs/config";
import { FsIo } from "./fs-io";
import { YtDl } from "./yt-dl";
import { Mutex } from "./mutex";
import { GlobalEvent } from "./global-event";

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AppController],
    providers: [AppService, GetVideo, FsIo, YtDl, Mutex, GlobalEvent],
})
export class AppModule {}
