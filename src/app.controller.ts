import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("app")
export class AppController {
    constructor(private appService: AppService) {}

    downloadOneVideo(url: string) {
        return this.appService.downloadOneVideo(url);
    }

    async downloadPlaylist(playlistURL: string) {
        return await this.appService.downloadPlaylist(playlistURL);
    }
}
