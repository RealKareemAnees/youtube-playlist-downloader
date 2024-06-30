import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import type ytdl from "ytdl-core";

@Controller("app")
export class AppController {
    constructor(private appService: AppService) {}

    async getBasicInfo(videoURL: string) {
        return await this.appService.getBasicInfo(videoURL);
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

    async getPlaylistInfo(playlistURL: string) {
        let videosInfos: any[] = [];
        const urls = await this.appService.fetchPlaylistUrls(playlistURL);
        for (const url of urls) {
            videosInfos.push(await this.getBasicInfo(url));
        }
        return videosInfos;
    }
    async downloadPlaylist(
        videsInfo: {
            url: string;
            itag: number;
            format?: string;
            filename?: string;
            dist?: string;
        }[] = [],
    ) {
        return await this.appService.downloadPlaylist(videsInfo);
    }
}
