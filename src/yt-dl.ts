import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import EventEmitter from "events";
import type { Readable } from "stream";
import * as ytdl from "ytdl-core";

@Injectable()
export class YtDl {
    constructor(private configService: ConfigService) {}

    async getBasicInfo(videoURL: string) {
        const info = await ytdl.getBasicInfo(videoURL);
        return info;
    }

    async getInfo(videoURL: string) {
        const info = await ytdl.getInfo(videoURL);
        return info;
    }

    getStream(videoURL: string, options: ytdl.downloadOptions): Readable {
        return ytdl(videoURL, options);
    }

    pauseDownload(ytdlStream: Readable): void {
        if (!ytdlStream.isPaused()) ytdlStream.pause();
    }

    continueDownload(ytdlStream: Readable): void {
        if (ytdlStream.isPaused()) ytdlStream.resume();
    }
}
