import { Controller, Post, Req } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('api/logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  addLog(@Req() req: any) {
    return this.loggerService.addLog(req.connection.remoteAddress);
  }
}
