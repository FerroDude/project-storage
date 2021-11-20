import api from '../config/api';
const endpoint = '/storage';

export const listAllStorages = () => {
  return api
    .get(`${endpoint}/listAll`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const listMyStorages = () => {
  return api
    .get(`${endpoint}/mystorages`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const listStorages = () => {
  return api
    .get(`${endpoint}/list`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getStorage = (id) => {
  return api
    .get(`${endpoint}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const createStorage = (body) => {
  return api
    .post(`${endpoint}`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const editStorage = (id, body) => {
  return api
    .patch(`${endpoint}/${id}`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const rentStorage = (body) => {
  return api
    .patch(`${endpoint}/${body._id}/rent`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteStorage = (id) => {
  return api
    .delete(`${endpoint}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
