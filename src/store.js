import {applyMiddleware, createStore} from "redux"
import reducer from "./reducers";
import thunk from "redux-thunk";

// const middleware = () => (next) => (action) =>{
//   console.log(action.type);
//   console.log(action.payload);
//   return next(action);
// }

const store = createStore(reducer, applyMiddleware(thunk));



export default store;