import { GETPROPERTYID } from "../type/type";

export const PropertyApiCrudReducer = ( state = [], action)=>{
  switch(action.type){
   case GETPROPERTYID:
      return action.data ;
   
   default:
      return state;
}
 }