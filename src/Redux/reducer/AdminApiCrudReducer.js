import { GETAPI, GETPROPERTYID } from "../type/type";
const initialState = [];
export const AdminApiCrudReducer = (state = initialState , action) =>{
   switch(action.type){
      case GETAPI:
           return action.data || state;
      
      default : 
      return state;
      
   } 
}


const initialState1 = [];
export const PropertyApiCrudReducer =(state = initialState1,action)=>{
  switch(action.type){
   case GETPROPERTYID:
      return action.data
   
   default:
      return state;
}
    
}