import { promises as fs } from 'fs';
import { join } from 'path';
import { NewUser, User } from '../types';

const DB_PATH = join(process.cwd(), 'src', 'mock', 'users.json');

export const setUsers = async (usersData: User[]): Promise<boolean> => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify({ usersData }, null, 2));
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const parsedData = JSON.parse(data);
    return parsedData.usersData || [];
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<User[]> => {
  const users = await getUsers();
  console.log(users);
  const userIndex = users.findIndex((el) => el.id == id);
  if (userIndex === -1) {
    console.error('not found user');
    return null;
  }
  users.splice(userIndex, 1);
  setUsers(users);
  return users;
};

export const updateUserInfo = async (
  id: number,
  userInfo: Partial<User>,
): Promise<User | null> => {
  const users = await getUsers();
  const editedUser = users.find((el) => el.id == id);

  if (!editedUser) {
    return null;
  }
  editedUser.email = userInfo.email ?? editedUser.email;
  editedUser.isActive = userInfo.isActive ?? editedUser.isActive;
  editedUser.name = userInfo.name ?? editedUser.name;

  setUsers(users);
  return editedUser;
};

export const setNewUser = async (newUser: NewUser): Promise<User[] | null> => {
  try {
    const users = await getUsers();
    const lastUserId = users[users.length - 1].id;
    console.log(lastUserId);
    users.push({ id: lastUserId + 1, ...newUser });
    await setUsers(users);
    return users;
  } catch (error) {
    console.error('Error adding new user:', error);
    throw error;
  }
};
