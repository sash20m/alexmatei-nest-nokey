import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty() username: string;
  @IsNotEmpty() role?: string;
}
