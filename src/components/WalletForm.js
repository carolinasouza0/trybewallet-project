import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, sendExpense, saveEditExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatchGetCurrencies } = this.props;
    dispatchGetCurrencies();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { dispatchAddExpense, wallet } = this.props;
    const { value, description, currency, method, tag } = this.state;
    dispatchAddExpense({ value, description, currency, method, tag }, wallet);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleEdit = (event) => {
    event.preventDefault();
    const { expenses, idToEdit, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const editCurrentExpense = expenses.find((expense) => expense.id === idToEdit);
    const editedCurrent = {
      value,
      description,
      currency,
      method,
      tag,
      id: idToEdit,
      exchangeRates: editCurrentExpense.exchangeRates,
    };
    const deleteExpense = expenses.filter((expense) => expense.id !== idToEdit);
    dispatch(saveEditExpense(deleteExpense));
    const newExpenses = [...deleteExpense, editedCurrent];
    dispatch(saveEditExpense(newExpenses.sort((a, b) => a.id - b.id)));
  };

  render() {
    const { wallet, editor } = this.props;
    const { currencies } = wallet;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((cur) => (
                <option key={ cur } value={ cur }>{ cur }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ editor ? this.handleEdit : this.handleSubmit }
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa' }

          </button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetCurrencies: () => dispatch(fetchCurrencies()),
  dispatchAddExpense: (expense, wallet) => dispatch(sendExpense(expense, wallet)),
  dispatch,
});

WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  dispatchGetCurrencies: PropTypes.func.isRequired,
  dispatchAddExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    }),
  ).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
