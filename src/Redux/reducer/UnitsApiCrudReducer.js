import { GETBLOCKAPIDATA } from "../type/type";
export const UnitsApiCrudReducer = (state = [] ,action) =>{
switch(action.type){
  case GETBLOCKAPIDATA :{
    return action.data 
  } 
  default:
 return state;
  }
}