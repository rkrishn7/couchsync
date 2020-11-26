import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import Settings from '@root/lib/settings';
import * as reducers from '@popup/reducers';

const rootReducer = combineReducers(reducers);

const constructMiddleware = () => {
  let middleware = [thunk];

  if (Settings.stage === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const logger = require('redux-logger').createLogger();
    middleware = [...middleware, logger];
  }

  return middleware;
};

export default createStore(rootReducer, applyMiddleware(...constructMiddleware()));

export type StoreState = ReturnType<typeof rootReducer>;
