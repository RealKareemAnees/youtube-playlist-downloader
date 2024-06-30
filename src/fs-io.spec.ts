import { Test, TestingModule } from '@nestjs/testing';
import { FsIo } from './fs-io';

describe('FsIo', () => {
  let provider: FsIo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FsIo],
    }).compile();

    provider = module.get<FsIo>(FsIo);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
