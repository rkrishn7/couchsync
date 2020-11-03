import axios from 'axios';
import settings from '@root/lib/settings';

const client = axios.create({
  baseURL: settings.apiUrl,
});

export default client;
