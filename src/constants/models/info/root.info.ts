import { ErrorModel } from '../error.model';

export type RootInfo = {
  isLogged: boolean;
  toggleIsLogged: () => void;

  token: string | null;
  setToken: (token: string | null) => void;

  isNewUser: boolean;
  setIsNewUser: (value: boolean) => void;

  error: ErrorModel | null;
  setError: (value: ErrorModel | null) => void;
  hasError: boolean;
  setHasError: (value: boolean) => void;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  haptics: boolean;
  toggleHaptics: () => void;

  completedSection: boolean;
  toggleCompletedSection: () => void;
};
