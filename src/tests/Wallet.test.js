import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const fetchAPI = Promise.resolve({
  json: () => Promise.resolve(mockData),
  ok: true,
});

jest.spyOn(global, 'fetch').mockImplementation(() => fetchAPI);
afterEach(() => jest.clearAllMocks());

describe('Testa se a página de carteira é renderizada', () => {
  test('Testa se a página de carteira é renderizada', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    userEvent.type(emailInput, 'alguem@email.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(loginButton);

    await waitFor(() => expect(history.location.pathname).toBe('/carteira'));
    const header = screen.getByTestId('header-currency-field');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('BRL');
  });
});
