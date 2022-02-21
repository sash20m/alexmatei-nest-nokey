import { IsNotEmpty } from 'class-validator';

export class LoginStatus {
  @IsNotEmpty() username: string;
  @IsNotEmpty() accessToken: string;
  @IsNotEmpty() expiresIn: string;
}
