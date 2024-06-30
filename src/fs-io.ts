import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import { join } from "path";
import type { Readable } from "stream";

@Injectable()
export class FsIo {
    constructor(private configService: ConfigService) {}

    createReadStream(path: string): Readable {
        return fs.createReadStream(path);
    }
    writeFile(
        content: Readable,
        format?: string,
        filename?: string,
        dist?: string,
    ): string {
        if (!dist) dist = this.configService.get("DEFAULT_DIR");
        if (!filename)
            filename = this.configService.get("DEFAULT_FILENAME") + "";
        if (!format) format = "mp4";

        const path = join(dist, filename + "." + format);

        const writeStream = fs.createWriteStream(path, { flags: "w+" });

        content.pipe(writeStream);

        content.on("end", () => {
            writeStream.close();
        });

        content.on("error", (err) => {
            writeStream.close();
            throw err;
        });

        return path;
    }
}
