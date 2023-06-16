export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';

const initialState = {
  isFetching: true,
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: true };
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload, isFetching: false };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
