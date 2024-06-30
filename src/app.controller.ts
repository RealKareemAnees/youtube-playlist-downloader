import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import type ytdl from "ytdl-core";

@Controller("app")
export class AppController {
    constructor(private appService: AppService) {}

    getBasicInfo(videoURL: string) {
        return this.appService.getBasicInfo(videoURL);
    }
    downloadOneVideo(url: string, options: ytdl.downloadOptions = {}) {
        return this.appService.downloadOneVideo(url);
    }

    async downloadPlaylist(playlistURL: string) {
        return await this.appService.downloadPlaylist(playlistURL);
    }
}
