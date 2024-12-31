export enum ErrorCodes {
  userNotFound = 'USER_NOT_FOUND',
  incorrectPassword = 'INCORRECT_PASSWORD',
  emailAlreadyInUse = 'EMAIL_ALREADY_IN_USE',
  couldNotBeSaved = 'COULD_NOT_BE_SAVED',
  courseGenerationFailed = 'COURSE_GENERATION_FAILED',
  courseNotFound = 'COURSE_NOT_FOUND',
  stepNotFound = 'STEP_NOT_FOUND',
  somethingWentWrong = 'SOMETHING_WENT_WRONG',
}

export type ErrorModel = {
  message: string;
  description: string;
  code: ErrorCodes;
};

export const GenericError = {
  message: 'Someting went wrong',
  description: '',
  code: ErrorCodes.somethingWentWrong,
};
