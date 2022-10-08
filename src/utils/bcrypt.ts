import bcrypt from 'bcrypt';

export async function hashPassword(candidatePassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR, 10));

  const hash = await bcrypt.hash(candidatePassword, salt);

  return hash;
}

export async function comparePasswords(
  candidatePassword: string,
  actualPassword: string,
): Promise<boolean> {
  const isValid = await bcrypt.compare(candidatePassword, actualPassword);

  return isValid;
}
