import api from '../config/api';
const endpoint = '/subscription';

export const loadSubscription = (id) => {
  return api.get(`${endpoint}`, { id }).then((res) => {
    return res.data;
  });
};

export const createSubscription = (body) => {
  return api.post(`${endpoint}`, body).then((res) => {
    return res.data;
  });
};

export const cancelSubscription = (id) => api.delete(`/subscription/${id}`);
