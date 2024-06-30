import { Injectable } from "@nestjs/common";
import { GetVideo } from "./get-video";
import puppeteer from "puppeteer";
import type ytdl from "ytdl-core";

@Injectable()
export class AppService {
    constructor(private getVideo: GetVideo) {}

    async getBasicInfo(videoURL: string) {
        return this.getVideo.getBasicInfo(videoURL);
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
        return this.getVideo.downloadVideo(url, options);
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
        try {
            for (const video of videsInfo) {
                this.downloadOneVideo(video.url, {
                    itag: video.itag,
                    format: video.format,
                    filename: video.filename,
                    dist: video.dist,
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async fetchPlaylistUrls(url: string): Promise<string[]> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        try {
            await page.goto(url, { waitUntil: "domcontentloaded" });

            // Wait for the playlist items to be fully loaded
            await page.waitForSelector(
                "a.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer",
            );

            // Extract video URLs
            const videoUrls = await page.evaluate(() => {
                const urls = [];
                const elements = document.querySelectorAll(
                    "a.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer",
                );

                elements.forEach((element) => {
                    const href = element.getAttribute("href");
                    if (href && href.startsWith("/watch")) {
                        urls.push(`https://www.youtube.com${href}`);
                    }
                });

                return urls;
            });

            return videoUrls;
        } catch (error) {
            console.error("Error scraping playlist URLs:", error);
            return [];
        } finally {
            await browser.close();
        }
    }
}
