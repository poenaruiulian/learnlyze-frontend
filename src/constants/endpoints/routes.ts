// const MAIN = 'http://localhost:3000';
const MAIN =
  'https://9f88-2a02-2f0a-e316-700-84f6-69b4-452f-46da.ngrok-free.app ';
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
