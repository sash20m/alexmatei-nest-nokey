import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDto } from './dto/userDto';
import { JwtPayload } from './passport/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto): Promise<any> {
    const user = await this.userService.findByLogin(loginUserDto);
    const token = this._createToken(user);

    return {
      username: user.username,
      ...token,
    };
  }

  private _createToken({ username, role }: UserDto): any {
    const user: JwtPayload = { username, role };
    const accessToken = this.jwtService.sign(user, {
      secret: 'mydirtylittlesecret',
      expiresIn: 86400,
    });

    return {
      expiresIn: 86400,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
