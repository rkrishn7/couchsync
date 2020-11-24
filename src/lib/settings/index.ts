import { merge } from 'lodash';

const SettingsDefault = {
  brandName: 'couchsync',
  apiUrl: 'http://localhost:8000',
};

type Stage = 'production' | 'development' | 'test';

const SettingsStage: Record<Stage, any> = {
  production: {
    apiUrl: 'https://e20aa53b7345.ngrok.io',
  },
  development: {},
  test: {},
};

export default merge(SettingsDefault, SettingsStage[process.env.NODE_ENV]);
