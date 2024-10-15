export type TLogin = {
  username: string;
  password: string;
};
export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};
export type TForget = {
  email: string;
};
export type TReset = {
  email: string;
  newPassword: string;
};
