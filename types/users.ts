export interface User {
  id: number
  fullName: string
  email: string
  password: string
  image?: string
  role?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserRegister {
    fullName: string;
    email: string;
    password: string
   
}

