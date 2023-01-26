import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

export const setToken = newToken => {
  token = `bearer ${newToken}`;
};

export const getAll = async () => {
  const result = await axios.get(baseUrl);
  return result.data;
};

export const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(
    `${baseUrl}/${id}`,
    { blog: newObject },
    config,
  );
  return request.data;
};
