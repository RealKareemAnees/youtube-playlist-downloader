import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import { join } from "path";
import type { Readable } from "stream";
import { userInfo } from "os";
@Injectable()
export class FsIo {
    constructor(private configService: ConfigService) {}

    /**
     * This method writes the contents of a readable stream to a file.
     *
     * @param {Readable} content - The readable stream containing the data to be written.
     * @param {string} [format] - The format of the file to be written. Defaults to the value specified in the configuration.
     * @param {string} [filename] - The name of the file to be written. Defaults to the value specified in the configuration.
     * @param {string} [dist] - The directory where the file will be written. Defaults to the value specified in the configuration.
     * @param {(err: NodeJS.ErrnoException | null, path: string) => void} [cb] - An optional callback function that will be called when the write operation is complete.
     * @returns {void}
     */
    writeFile(
        content: Readable,
        format: string = this.configService.get<string>("DEFAULT_FORMAT")!,
        filename: string = this.configService.get<string>("DEFAULT_FILENAME")!,
        dist: string = `C:/Users/${userInfo().username}/Downloads/YPD`,
        cb?: (err: NodeJS.ErrnoException | null, path: string) => void,
    ): void {
        const path = join(dist, `${filename}.${format}`);
        const writeStream = fs.createWriteStream(path, { flags: "w+" });

        const handleError = (err: NodeJS.ErrnoException | null) => {
            writeStream.close();
            if (cb) cb(err, null);
        };

        const handleFinish = () => {
            if (cb) cb(null, path);
        };

        content.on("error", handleError);
        content.on("end", () => writeStream.end());
        content.on("data", (data) => {
            if (!writeStream.write(data)) content.pause();
        });

        writeStream.on("finish", handleFinish);
        writeStream.on("error", handleError);
        writeStream.on("drain", () => content.resume());
    }
}
