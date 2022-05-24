export interface User {
  id: string;
  email: string;
  password: string;
}

export interface CreateUsertDTO extends Omit<User, "id"> {}
