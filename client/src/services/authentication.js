import axios from 'axios';

export const signUp = (body) => {
  axios
    .post(/*missing server here*/ '/authentication/sign-up', body)
    .then((res) => {
      return res.data.user;
    });
};
