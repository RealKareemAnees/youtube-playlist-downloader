import { Test, TestingModule } from "@nestjs/testing";
import { GetVideo } from "./get-video";
import { ConfigModule } from "@nestjs/config";
import { FsIo } from "./fs-io";
import { YtDl } from "./yt-dl";
import { Mutex } from "./mutex";

describe("GetVideo", () => {
    let provider: GetVideo;
    const videoURLMock: string = "https://www.youtube.com/watch?v=T-teT0Ugdsw";
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ envFilePath: ".env" })],
            providers: [GetVideo, FsIo, YtDl, Mutex],
        }).compile();

        provider = module.get<GetVideo>(GetVideo);
    });

    it("should be defined", () => {
        expect(provider).toBeDefined();
    });

    it("should get video info", () => {
        const info = provider.getInfo(videoURLMock);
        console.log(info);
        expect(info).toBeDefined();
    });
});
