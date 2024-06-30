import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ytdl from "ytdl-core";

@Injectable()
export class GetVideo {
    constructor(private configService: ConfigService) {
        console.log(this.configService.get("DEFAULT_CONCURRENT_TASKS"));
    }
}
