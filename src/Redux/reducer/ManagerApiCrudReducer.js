import { GETMANAGERAPIDATA } from "../type/type";
export const ManagerApiCrudReducer = (state = [],action) =>{
    switch(action.type){
        case GETMANAGERAPIDATA:
         return action.data;   
         
         default:
         return state;
    }
}