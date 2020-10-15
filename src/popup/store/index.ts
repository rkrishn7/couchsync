import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import * as reducers from '@popup/reducers';

const rootReducer = combineReducers(reducers);

// Middleware
const logger = createLogger();

export default createStore(rootReducer, applyMiddleware(logger));

export type StoreState = ReturnType<typeof rootReducer>;
