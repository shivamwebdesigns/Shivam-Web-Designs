export const adminPasswordMinLength = 12;
export const adminPasswordMaxLength = 128;

export function isAdminPasswordLengthValid(password: string): boolean {
  const trimmedLength = password.trim().length;
  return (
    trimmedLength >= adminPasswordMinLength &&
    password.length <= adminPasswordMaxLength
  );
}
