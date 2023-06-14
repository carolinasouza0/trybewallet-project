export const VALID_EMAIL = 'VALID_EMAIL';

export const login = (email) => ({
  type: VALID_EMAIL,
  payload: email,
});
