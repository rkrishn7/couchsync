import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as reducers from '@contentScript/reducers';

const rootReducer = combineReducers(reducers);

// Middleware
const logger = createLogger();

export default createStore(rootReducer, applyMiddleware(logger, thunk));

export type StoreState = ReturnType<typeof rootReducer>;
