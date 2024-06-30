import { Test, TestingModule } from '@nestjs/testing';
import { GlobalEvent } from './global-event';

describe('GlobalEvent', () => {
  let provider: GlobalEvent;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalEvent],
    }).compile();

    provider = module.get<GlobalEvent>(GlobalEvent);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
