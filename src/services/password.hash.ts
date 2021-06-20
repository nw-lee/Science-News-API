import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 12);
  return hash;
};

export const checkPassword = async (hash: string, password: string) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
