import { IsEmail, IsString, Length } from 'class-validator';

export class EmailRequestDTO {
  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(1, 255)
  firstName: string;

  @IsString()
  @Length(1, 255)
  lastName: string;

  @IsString()
  subject: string;

  @IsString()
  @Length(1, 20000)
  message: string;
}
