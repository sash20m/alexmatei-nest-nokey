import { User } from 'src/model/UserEntity/user.entity';
import { UserDTO } from './userDto';

export const toUserDTO = (data: User): UserDTO => {
  const { username, role } = data;
  const userDto: UserDTO = { username, role };
  return userDto;
};
