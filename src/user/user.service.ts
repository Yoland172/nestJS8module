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
    try {
      const users = await getUsers();
      console.log(users);
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async setNewUser(userData: UserCreateDto): Promise<User[]> | null {
    try {
      const newUser = await setNewUser(userData);
      return newUser ? newUser : null;
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  }

  async changeUserInfo(userData: Partial<User>, userId: number) {
    try {
      return await updateUserInfo(userId, userData);
    } catch {
      return null;
    }
  }

  async deleteUser(id: number) {
    try {
      return await deleteUser(id);
    } catch {
      console.error('can`t delete user');
      return null;
    }
  }
}
