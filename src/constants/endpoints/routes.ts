const MAIN = 'http://localhost:3000';
const AUTH = `${MAIN}/auth`;

export const routes = {
  emailJs: 'https://api.emailjs.com/api/v1.0/email/send',
  youtube: 'https://www.youtube.com/watch?v=',
  main: MAIN,
  graphQL: `${MAIN}/graphql`,
  auth: {
    main: AUTH,
    login: `${AUTH}/login`,
    register: `${AUTH}/register`,
  },
};
