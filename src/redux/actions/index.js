export const VALID_EMAIL = 'VALID_EMAIL';

export const login = (email) => ({
  type: VALID_EMAIL,
  payload: email,
});

export const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

export const getCurrencies = (currencies) => ({
  type: 'GET_CURRENCIES',
  payload: currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const filterCur = Object.keys(data).filter((key) => key !== 'USDT');
  dispatch(getCurrencies(filterCur));
};
