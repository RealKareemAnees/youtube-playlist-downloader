import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Readable } from "stream";
import ytdl from "ytdl-core";

@Injectable()
export class YtDl {
    constructor(private configService: ConfigService) {}

    async getBasicInfo(videoURL: string): Promise<ytdl.videoInfo> {
        const info = await ytdl.getInfo(videoURL);
        return info;
    }

    getStream(videoURL: string, itag: number): Readable {
        return ytdl(videoURL);
    }

    pauseDownload(ytdlStream: Readable): void {
        if (!ytdlStream.isPaused()) ytdlStream.pause();
    }

    continueDownload(ytdlStream: Readable): void {
        if (ytdlStream.isPaused()) ytdlStream.resume();
    }
}
