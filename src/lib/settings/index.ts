import { merge } from 'lodash';

type Stage = 'production' | 'development' | 'test';

const SettingsDefault = {
  brandName: 'couchsync',
  baseUrl: 'http://127.0.0.1',
  apiUrl: 'http://127.0.0.1',
  stage: process.env.NODE_ENV as Stage,
};

const SettingsStage: Record<Stage, any> = {
  production: {
    baseUrl: 'https://www.couchsync.live',
    apiUrl: 'https://www.couchsync.live/api',
  },
  development: {},
  test: {},
};

let localSettings = {};

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  localSettings = require('./settings-local');
} catch {}

export default merge(SettingsDefault, SettingsStage[process.env.NODE_ENV], localSettings) as typeof SettingsDefault;
