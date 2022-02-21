import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/UserEntity/user.entity';
import { Repository } from 'typeorm';
import { GeneratePasswordHash } from '../../utils/passwordHashing';
import { toUserDTO } from './dto/toUserDto';
import { UserDTO } from './dto/userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(options): Promise<UserDTO> {
    const user = await this.userRepository.findOne(options);
    return toUserDTO(user);
  }

  async findByLogin(credentials): Promise<any> {
    const user = await this.userRepository.findOne({
      username: credentials.username,
      password: GeneratePasswordHash(credentials.password),
    });

    if (!user) {
      throw new BadRequestException('Wrong Email or password');
    }

    return { username: user.username, role: user.role };
  }

  async findByPayload({ username }: any): Promise<UserDTO> {
    return await this.findOne({
      where: { username },
    });
  }
}
