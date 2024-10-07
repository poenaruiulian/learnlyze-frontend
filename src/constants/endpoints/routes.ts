const MAIN = 'http://localhost:3000';
const AUTH = `${MAIN}/auth`;

export const routes = {
  main: MAIN,
  graphQL: `${MAIN}/graphql`,
  auth: {
    main: AUTH,
    login: `${AUTH}/login`,
    register: `${AUTH}/register`,
  },
};
