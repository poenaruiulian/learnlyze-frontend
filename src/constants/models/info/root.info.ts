export type RootInfo = {
  isLogged: boolean;
  toggleIsLogged: () => void;

  token: string | null;
  setToken: (token: string | null) => void;
};
