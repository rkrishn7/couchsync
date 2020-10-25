import axios from 'axios';
import settings from '@root/lib/settings';

export default axios.create({
  baseURL: settings.apiUrl,
});
