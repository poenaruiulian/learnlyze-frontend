const MAIN =
  'https://a7e5-2a02-2f0a-e316-700-9ca5-fd1d-48e5-5605.ngrok-free.app';
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
