import { Injectable, Logger } from "@nestjs/common";
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

    private getAudioFormat(mimeType: string): string {
        if (mimeType.includes("mp4")) {
            return "M4A";
        } else if (mimeType.includes("webm")) {
            return "WEBM";
        } else {
            return mimeType.split("/")[1].toUpperCase(); // Fallback to the raw MIME type
        }
    }

    async getBasicInfo(videoURL: string): Promise<{
        title: string;
        duration: string;
        thumbnail: string;
        url: string;
        videoQualities: {
            resolution: string;
            format: string;
            size: number;
            fps: number;
            itag: number;
        }[];
        audioQualities: {
            itag: number;
            size: number;
        }[];
    }> {
        const info = await this.ytdl.getBasicInfo(videoURL);
        Logger.log("getting info for: " + videoURL);

        const videoQualities = info.formats
            .filter((f) => f.qualityLabel)
            .map((f) => {
                return {
                    quality: f.quality,
                    resolution: f.qualityLabel,
                    format: f.container,
                    size: (parseInt(f.contentLength) || 0) / 1024 / 1024, // size in MB
                    fps: f.fps,
                    itag: f.itag,
                };
            });

        const audioQualities = ytdl
            .filterFormats(info.formats, "audioonly")
            .map((f) => {
                return {
                    audiobitrate: f.audioBitrate,
                    itag: f.itag,
                    size: (parseInt(f.contentLength) || 0) / 1024 / 1024, // size in MB
                };
            });

        const result = {
            title: info.videoDetails.title,
            duration: info.videoDetails.lengthSeconds,
            thumbnail: info.videoDetails.thumbnails[0].url,
            url: videoURL,
            videoQualities: videoQualities,
            audioQualities: audioQualities,
        };

        console.log(result);
        return result;
    }

    downloadVideo(
        videoURL: string,
        options: ytdl.downloadOptions = {},
        format?: string,
        filename?: string,
        dist?: string,
    ): string {
        let path: string = "";
        Logger.log("downloading: " + videoURL);
        this.fsIo.writeFile(
            this.ytdl.getStream(videoURL, options),
            format,
            filename,
            dist,
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
