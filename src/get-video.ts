import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GetVideo {
    constructor(private configService: ConfigService) {
        console.log(this.configService.get("DEFAULT_CONCURRENT_TASKS"));
    }
}
