import api from '../config/api';

export const signUp = (body) => {
  api.post('/authentication/sign-up', body).then((res) => {
    return res.data.user;
  });
};
