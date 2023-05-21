import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from './reducers/authReducer';

const appReducer = combineReducers({
  auth: authReducer, 
})

const rootReducer = (state : any, action: any) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer, middleware);
