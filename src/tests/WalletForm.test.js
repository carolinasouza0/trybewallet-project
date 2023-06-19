import { screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const VALUE_ID = 'value-input';

describe('Testa as funcionalidades do WalletForm', () => {
  test('Testa se o formulário está sendo renderizado na tela', () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId(VALUE_ID);
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const addButton = screen.getByRole('button', { name: /despesa/i });

    expect(value).toBeDefined();
    expect(description).toBeDefined();
    expect(currency).toBeDefined();
    expect(method).toBeDefined();
    expect(tag).toBeDefined();
    expect(addButton).toBeDefined();
  });

  test('Testa se handleChange é chamado quando o formulário é preenchido', () => {
    const handleChange = jest.fn();
    renderWithRouterAndRedux(<Wallet handleChange={ handleChange } />);

    const value = screen.getByTestId(VALUE_ID);
    expect(value).toBeDefined();

    userEvent.type(value, '1');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('Testa se handleSubmit é chamado quando o botão de adicionar despesa é clicado', async () => {
    const exchangeRate = mockData.USD.ask;
    const currencyName = mockData.USD.name;
    const valueBRL = 10 * exchangeRate;

    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId(VALUE_ID);
    const description = screen.getByTestId('description-input');
    const addButton = screen.getByRole('button', { name: /despesa/i });

    expect(value).toBeDefined();
    expect(description).toBeDefined();
    expect(addButton).toBeDefined();

    userEvent.type(value, '10');
    userEvent.type(description, 'Teste');
    userEvent.click(addButton);

    const tableValue = screen.findByText('10');
    const tableDescription = screen.findByText('Teste');
    const currencyDescription = screen.findByText(currencyName);
    const rate = screen.queryByText('4.75');
    const BRL = screen.findByText('BRL');
    const deleteButton = screen.findByTestId('delete-btn');
    const editButton = screen.findByTestId('edit-btn');
    const convertedAmount = screen.findByText(valueBRL);

    expect(value.innerText).not.toBeDefined();
    expect(description.innerText).not.toBeDefined();
    expect(tableValue).toBeDefined();
    expect(tableDescription).toBeDefined();
    expect(currencyDescription).toBeDefined();
    expect(rate).toBeDefined();
    expect(BRL).toBeDefined();
    expect(deleteButton).toBeDefined();
    expect(editButton).toBeDefined();
    expect(convertedAmount).toBeDefined();

    userEvent.click(await editButton);
    expect(tableValue).not.toBeDefined();
  });
});
