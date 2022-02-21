import { Body, Controller, Post } from '@nestjs/common';
import { EmailRequestDTO } from './dto/request.dto';
import { EmailService } from './email.service';

@Controller('api/email')
export class EmailController {
  constructor(private readonly booksService: EmailService) {}

  @Post()
  addPost(@Body() data: EmailRequestDTO) {
    return this.booksService.sendMail({
      ...data,
    });
  }
}
