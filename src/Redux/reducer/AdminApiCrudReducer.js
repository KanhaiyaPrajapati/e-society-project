import { GETAPI } from "../type/type";
const initialState = [];
export const AdminApiCrudReducer = (state = initialState , action) =>{
   switch(action.type){
      case GETAPI:
           return action.data || state;
      
      default : 
      return state;
      
   } 
}
