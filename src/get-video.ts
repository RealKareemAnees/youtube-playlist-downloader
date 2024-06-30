import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as ytdl from "ytdl-core";
import { YtDl } from "./yt-dl";
import { FsIo } from "./fs-io";
import { Mutex } from "./mutex";

@Injectable()
export class GetVideo {
    constructor(
        private configService: ConfigService,
        private ytdl: YtDl,
        private fsIo: FsIo,
        private mutex: Mutex,
    ) {}

    async getBasicInfo(videoURL: string) {
        const info = await this.ytdl.getBasicInfo(videoURL);
        return info;
    }

    downloadVideo(videoURL: string): string {
        let path: string = "";
        this.fsIo.writeFile(
            this.ytdl.getStream(videoURL, {}),
            undefined,
            undefined,
            undefined,
            (err, path) => {
                if (err) {
                    throw err;
                }
                if (path) {
                    path = path;
                }
            },
        );
        return path;
    }
}
