import api from '../config/api';
const endpoint = '/user';

export const loadAuthenticatedUser = () => {
  return api.get(`${endpoint}`).then((res) => {
    return res.data;
  });
};

export const editUser = (body) => {
  return api.patch(`${endpoint}`, body).then((res) => {
    return res.data;
  });
};

export const getUser = (id) => {
  return api.get(`${endpoint}/${id}`).then((res) => {
    return res.data;
  });
};

export const deleteUser = (id) => {
  return api.delete(`${endpoint}`).then((res) => {
    return res.data;
  });
};

export const uploadImage = (data) => {
  return api
    .post(`${endpoint}/upload`, data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then((res) => {
      return res.data;
    });
};
