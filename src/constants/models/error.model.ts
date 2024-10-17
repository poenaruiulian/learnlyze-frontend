export enum ErrorCodes {
  userNotFound = 'USER_NOT_FOUND',
  incorrectPassword = 'INCORRECT_PASSWORD',
  emailAlreadyInUse = 'EMAIL_ALREADY_IN_USE',
  couldNotBeSaved = 'COULD_NOT_BE_SAVED',
}

export type ErrorModel = {
  message: string;
  description: string;
  code: ErrorCodes;
};
