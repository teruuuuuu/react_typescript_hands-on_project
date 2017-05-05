import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

declare const module: any;

export default function StoreConfig(initialState: any) {
  const finalCreateStore = applyMiddleware(thunk)(createStore);
  const store = finalCreateStore(rootReducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }
  return store
}
