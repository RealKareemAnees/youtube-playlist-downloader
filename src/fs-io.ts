import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as fsPromises from "fs/promises";
import { join } from "path";
import type { Readable } from "stream";
import { userInfo } from "os";

@Injectable()
export class FsIo {
    constructor(private configService: ConfigService) {}

    createReadStream(path: string): Readable {
        return fs.createReadStream(path);
    }

    async writeFile(
        content: Readable,
        format?: string,
        filename?: string,
        dist?: string,
        cb?: (err: NodeJS.ErrnoException | null, path: string) => void,
    ): Promise<void> {
        if (!dist) dist = `C:/Users/${userInfo().username}/Downloads/YPD`;
        if (!filename) filename = this.configService.get("DEFAULT_FILENAME");
        if (!format) format = this.configService.get("DEFAULT_FORMAT");

        const path = join(dist, filename + "." + format);

        try {
            await fsPromises.mkdir(dist, { recursive: true }); // Ensure directory exists

            const writeStream = fs.createWriteStream(path, { flags: "w+" });

            content.pipe(writeStream);

            content.on("end", () => {
                writeStream.close();
            });

            content.on("error", (err) => {
                writeStream.close();
                if (cb) cb(err, null);
            });

            writeStream.on("finish", () => {
                if (cb) cb(null, path);
            });

            writeStream.on("error", (err) => {
                if (cb) cb(err, null);
            });
        } catch (err) {
            if (cb) cb(err, null);
        }
    }
}
