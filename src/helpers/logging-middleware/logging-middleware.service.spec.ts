import { Test, TestingModule } from '@nestjs/testing';
import { LoggingMiddlewareService } from './logging-middleware.service';

describe('LoggingMiddlewareService', () => {
  let service: LoggingMiddlewareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingMiddlewareService],
    }).compile();

    service = module.get<LoggingMiddlewareService>(LoggingMiddlewareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
