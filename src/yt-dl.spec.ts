import { Test, TestingModule } from '@nestjs/testing';
import { YtDl } from './yt-dl';

describe('YtDl', () => {
  let provider: YtDl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YtDl],
    }).compile();

    provider = module.get<YtDl>(YtDl);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
