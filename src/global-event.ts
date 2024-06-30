import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GlobalEvent {
    constructor(private configService: ConfigService) {}
}
