export interface User {
  id: number
  fullname: string
  email: string
  password: string
  role?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserRegister {
    fullName: string;
    email: string;
    password: string
   
}

