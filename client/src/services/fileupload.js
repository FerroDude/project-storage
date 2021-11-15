import api from '../config/api';
const endpoint = '/upload';

export const uploadSingleFile = (data) => {
  return api
    .post(`${endpoint}/single`, data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((res) => {
      return res.data;
    });
};

export const uploadMultipleFiles = (data) => {
  return api
    .post(`${endpoint}/multiple`, data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((res) => {
      return res.data;
    });
};
