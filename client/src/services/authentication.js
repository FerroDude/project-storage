import api from '../config/api';

export const signUp = (body) => {
  return api.post('authentication/sign-up', body).then((response) => {
    return response.data;
  });
};

export const signIn = (body) => {
  return api
    .post('authentication/sign-in', body)
    .then((response) => response.data);
};

export const signOut = () => {
  return api.post('/authentication/sign-out');
};
