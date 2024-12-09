import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/createUser.dto';
import {
  deleteUser,
  getUsers,
  setNewUser,
  updateUserInfo,
} from './utils/helpers/fsHelper';
import { User } from './utils/types';

@Injectable()
export class UserService {
  async findAll(): Promise<User[]> {
    const users = await getUsers();
    console.log(users);
    return users;
  }

  async setNewUser(userData: UserCreateDto): Promise<User[]> | null {
    const newUser = await setNewUser(userData);
    return newUser ? newUser : null;
  }

  async changeUserInfo(userData: Partial<User>, userId: number) {
    return await updateUserInfo(userId, userData);
  }

  async deleteUser(id: number) {
    return await deleteUser(id);
  }
}
