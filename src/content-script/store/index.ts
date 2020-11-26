import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { ContentScriptActions } from '@root/lib/constants';
import Settings from '@root/lib/settings';
import * as reducers from '@contentScript/reducers';

const rootReducer = (state: any, action: any) => {
  const root = combineReducers(reducers);
  if (action.type === ContentScriptActions.TEARDOWN_STATE) {
    return root(undefined, action);
  }

  return root(state, action);
};

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
