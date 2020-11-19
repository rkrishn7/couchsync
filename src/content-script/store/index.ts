import { applyMiddleware, createStore, combineReducers } from 'redux';
import { ContentScriptActions } from '@root/lib/constants';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from '@contentScript/reducers';

const rootReducer = (state: any, action: any) => {
  const root = combineReducers(reducers);
  if (action.type === ContentScriptActions.TEARDOWN_STATE) {
    return root(undefined, action);
  }

  return root(state, action);
};

// Middleware
const logger = createLogger();

export default createStore(rootReducer, applyMiddleware(logger, thunk));

export type StoreState = ReturnType<typeof rootReducer>;
