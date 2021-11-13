import api from '../config/api';

export const signUp = (body) => {
  return api.post('authentication/sign-up', body).then((response) => {
    console.log(response);
    return response.data;
  });
};

export const signIn = (body) => {
  api
    .post('authentication/sign-in', body)
    .then((response) => response.data.user);
};
