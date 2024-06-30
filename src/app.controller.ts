import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import type ytdl from "ytdl-core";

@Controller("app")
export class AppController {
    constructor(private appService: AppService) {}

    getBasicInfo(videoURL: string) {
        return this.appService.getBasicInfo(videoURL);
    }
    downloadOneVideo(
        url: string,
        options: {
            itag: number;
            format?: string;
            filename?: string;
            dist?: string;
        },
    ) {
        return this.appService.downloadOneVideo(url, options);
    }

    async downloadPlaylist(playlistURL: string) {
        return await this.appService.downloadPlaylist(playlistURL);
    }
}
