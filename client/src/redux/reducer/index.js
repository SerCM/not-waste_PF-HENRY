const initialState = {
  seller: [],
  cities: [],
  product: [],
  price: [],
  diet: [],
  customer: [],
  prodDetails: [],
  allSeller: [],
  queryParams: {},
  errorMessage: "",
  currentOrder: [],
  cart: [],
  payId: [],
  postDetail: [],
  orderDetail: {},
  managers: [],
  allPosts: [],
  orders: []
};

export default function rootReducer(state = initialState, actions) {
  switch (actions.type) {
    case "GET_SELLER":
      return {
        ...state,
        seller: actions.payload,
        allSeller: actions.payload,
        queryParams: actions.query,
      };
    case "REQUEST_ERROR":
      return {
        ...state,
        errorMessage: actions.payload,
      };

    case "GET_CITIES":
      return {
        ...state,
        cities: actions.payload,
      };
    case "GET_DIET":
      return {
        ...state,
        diet: actions.payload,
      };

    case "GET_PRODUCT": {
      return {
        ...state,
        product: actions.payload,
        queryParams: actions.query,
      };
    }

    case "GET_CUSTOMER":
      return {
        ...state,
        customer: actions.payload,
      };

    case "PROD_DETAIL":
      return {
        ...state,
        prodDetails: actions.payload,
      };

    case "CLEAN_DETAIL":
      return {
        ...state,
        prodDetails: []
      }

    case "POST_PRODUCT":
      return {
        ...state,
        seller: actions.payload,
      };
    case "POST_ORDER":
      return {
        ...state,
        currentOrder: actions.payload,
        orders: [...state.orders, actions.payload]
      };
    case "PUT_ORDER":
      return {
        ...state,
        currentOrder: actions.payload,
        orders: [...state.orders, actions.payload]
      };
    case "ADD_CART":
      return {
        ...state,
        cart: [...state.cart, actions.payload],
      };
    case "MODIFY_CART":
      
      return {
        ...state,
        cart: [state.cart.filter(c => c.postId !== actions.payload.postId), actions.payload]
      }
    case "DELETE_CART":
      return {
        ...state,
        cart: state.cart.filter(c => c.postId !== actions.payload)
      }
    case "POST_PAY":
      return {
        ...state,
        payId: actions.payload,
      };
    case "POST_DETAIL":
      return {
        ...state,
        postDetail: actions.payload,
      };
    case "MODIFY_POST":
      return {
        ...state,
        postDetail: actions.payload,
      };

    case "ORDER_DETAIL":
      return {
        ...state,
        orderDetail: actions.payload
      }
    case "GET_ORDERS":
      return {
        ...state,
        orders: actions.payload
      }
    case "GET_MANAGERS":
      return {
        ...state,
        managers: actions.payload,
      };
    case "GET_POSTEO":
      return {
        ...state,
        allPosts: actions.payload,
      };
    default:
      return state;
  }
}
