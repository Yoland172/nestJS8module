export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export interface NewUser {
  name: string;
  email: string;
  isActive: boolean;
}
