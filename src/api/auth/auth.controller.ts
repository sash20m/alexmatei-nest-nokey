import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginStatus } from './dto/LoginStatus';
import { LoginUserDto } from './dto/loginUserDto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }
}
