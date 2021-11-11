import axios from 'axios';

export const signUp = (body) => {
  axios.post('/authentication/sign-up', body).then((res) => {
    return res.data.user;
  });
};
