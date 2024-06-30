import { Test, TestingModule } from '@nestjs/testing';
import { Mutex } from './mutex';

describe('Mutex', () => {
  let provider: Mutex;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mutex],
    }).compile();

    provider = module.get<Mutex>(Mutex);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
