// productsReducer.js
const initialState = {
  products: [],
  searchTerm: ''
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };
    default:
      return state;
  }
};

export default productsReducer;
