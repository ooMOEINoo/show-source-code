import { hash , genSalt, compare } from 'bcryptjs';

export async function hashPassword(password: string, genSaltHash: number = 10) {
  const salt = await genSalt(genSaltHash);
  return await hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await compare(password, hashedPassword);
}
