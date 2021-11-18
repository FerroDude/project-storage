import api from '../config/api';
const endpoint = '/storage';

export const listStorages = () => {
  return api.get(`${endpoint}/list`).then((res) => {
    return res.data;
  });
};

export const getStorage = (id) => {
  return api.get(`${endpoint}/${id}`).then((res) => {
    return res.data;
  });
};

export const createStorage = (body) => {
  return api.post(`${endpoint}`, body).then((res) => {
    return res.data;
  });
};

export const editStorage = (id, body) => {
  return api.patch(`${endpoint}/${id}`, body).then((res) => {
    return res.data;
  });
};

export const deleteStorage = (id) => {
  return api.delete(`${endpoint}/${id}`).then((res) => {
    return res.data;
  });
};
