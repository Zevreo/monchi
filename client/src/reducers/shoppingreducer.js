
export const shoppinginitialstate = {
    products: [
      {id:1, name: "p1", precio: 100},
      {id:2, name: "p1", precio: 100},
      {id:3, name: "p1", precio: 100},
      {id:4, name: "p1", precio: 100},
      {id:5, name: "p1", precio: 100},
      {id:6, name: "p1", precio: 100},
      {id:7, name: "p1", precio: 100},
      {id:8, name: "p1", precio: 100},
      {id:9, name: "p1", precio: 100},
      {id:10, name: "p1", precio: 100},
      {id:11, name: "p1", precio: 100},
      {id:12, name: "p1", precio: 100},

    ]
};

export function ShoppingReducer(state, action){
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
      return:state;
  }
};