import { GETBLOCKSAPI } from "../type/type";
export const BlocksApiCrudReducer = (state = [] ,action) =>{
    switch(action.type){
        case GETBLOCKSAPI:{
        return action.data 
        }
        default :
        return state;
    }
}