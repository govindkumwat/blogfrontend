import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const preloadedState = {}; // Provide your initial state if needed

const middlewares = [thunk];
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
);

const store = createStore(
  rootReducer,
  preloadedState,
  enhancer
);

export default store;
