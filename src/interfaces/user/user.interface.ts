import { FindManyOptions, FindOneOptions } from 'typeorm';

import User from '@entities/user/user.entity';

// Auth routes DTO
export class SignUpUserDto {
  fullname: string;
  email: string;
  phone: string;
  password: string;
}
export class SignInUserDto {
  email: string;
  password: string;
}

// User routes DTO
export class UpdateUserDto {
  fullname?: string;
  email?: string;
  phone?: string;
  password?: string;
}

// User routes interface
export interface IGetAllUserQuery {
  details: 'true' | 'false';
}
export interface IGetUserParam {
  userId?: string;
}

// Respository queries types
export type IFindUsersOption = FindManyOptions<User>;
export type IFindUserOption = FindOneOptions<User>;


// Enum User Role
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MEMBER = 'member',
}

// Type User Payload for generate token
export type UserPayload = Pick<
  User,
  'email' | 'fullname' | 'role' | 'id' | 'phone'
>;
