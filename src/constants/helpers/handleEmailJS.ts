import { headers, methods, routes } from '../endpoints';

const serviceId = process.env.EXPO_PUBLIC_EMAIL_SERVICE_ID;
const templateId = process.env.EXPO_PUBLIC_EMAIL_TEMPLATE_ID;
const userId = process.env.EXPO_PUBLIC_EMAIL_PUBLIC_KEY;

const getRandomNumber = () => Math.floor(Math.random() * (9 - 1) + 1);
export const generateSecurityCode = `${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}`;

export const sendEmail = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const templateParams = {
    email,
    body: code,
  };

  const data = {
    service_id: serviceId,
    template_id: templateId,
    user_id: userId,
    template_params: templateParams,
  };

  await fetch(routes.emailJs, {
    method: methods.POST,
    headers: headers.default,
    body: JSON.stringify(data),
  })
    .then(() => console.log(`Sent security code: ${code} with success`))
    .catch(console.log);
};
