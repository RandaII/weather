import {createStore} from "redux"
import reducer from "./reducers";

// const middleware = () => (next) => (action) =>{
//   console.log(action.type);
//   console.log(action.payload);
//   return next(action);
// }

const store = createStore(reducer);



export default store;