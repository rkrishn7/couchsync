import axios from 'axios';
import settings from '@root/lib/settings';
import camelCase from 'camelcase-keys';

const client = axios.create({
  baseURL: settings.apiUrl,
});

client.interceptors.response.use(response => ({
  ...response,
  data: camelCase(response.data),
}));

export default client;
