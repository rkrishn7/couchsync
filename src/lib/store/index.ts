import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import * as reducers from '@root/lib/reducers';

const rootReducer = combineReducers(reducers);

// Middleware
const logger = createLogger();

export default createStore(rootReducer, applyMiddleware(logger));

export type StoreState = ReturnType<typeof rootReducer>;
