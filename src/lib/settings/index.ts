import { merge } from 'lodash';

type Stage = 'production' | 'development' | 'test';

const SettingsDefault = {
  brandName: 'couchsync',
  apiUrl: 'https://e20aa53b7345.ngrok.io',
  stage: process.env.NODE_ENV as Stage,
};

const SettingsStage: Record<Stage, any> = {
  production: {
    apiUrl: 'https://e20aa53b7345.ngrok.io',
  },
  development: {},
  test: {},
};

export default merge(SettingsDefault, SettingsStage[process.env.NODE_ENV]) as typeof SettingsDefault;
