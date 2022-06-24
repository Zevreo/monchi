import {TYPES} from "./actions/shoppingactions";

export const shoppinginitialstate = {
  products: [
    {id:1, name: "The Over Shir", precio: 100},
    {id:2, name: "Script Sweatshirt", precio: 150},
    {id:3, name: "Splatter Tank Top", precio: 200},
    {id:4, name: "Consume T-Shirt", precio: 180},
    {id:5, name: "Script Tank Top", precio: 125},
    {id:6, name: "The Deadline", precio: 150},
    {id:7, name: "Dark Shirt Logo", precio: 170},
    {id:8, name: "Nowhere T-Shirt", precio: 200},
    {id:9, name: "Ping Sweatshirt", precio: 100},
    {id:10, name: "The Loose Scripts", precio: 150},
    {id:11, name: "Script Sweatshirt", precio: 180},
    {id:12, name: "The Arch Sweatshirt", precio: 200},
  ]
};


export function shoppingreducer(state, action){
  switch(action.type){
    case TYPES.ADD_TO_CART:{
    }
    case TYPES.REMOVE_ONE_FROM_CART:{
    }
    case TYPES.REMOVE_ALL_FROM_CART:{
    }
    case TYPES.CLEAR_CART:{
    }
    default:
      return state;
  }
}