import { User } from 'src/model/UserEntity/user.entity';
import { UserDto } from './userDto';

export const toUserDto = (data: User): UserDto => {
  const { username } = data;
  const userDto: UserDto = { username };
  return userDto;
};
