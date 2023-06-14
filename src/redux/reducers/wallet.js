export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

const initialState = {
  isFetching: true,
  currencies: [],
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: true };
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload, isFetching: false };
  default:
    return state;
  }
};

export default wallet;
