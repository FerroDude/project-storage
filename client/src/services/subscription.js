import api from '../config/api';
const endpoint = '/subscription';

export const loadSubscription = () => {
  return api.get(`${endpoint}`).then((res) => {
    return res.data;
  });
};

export const createSubscription = () => {
  return api.post(`${endpoint}`).then((res) => {
    return res.data;
  });
};

export const cancelSubscription = () => api.patch('/subscription');
