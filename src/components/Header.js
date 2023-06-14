import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  conversionValue = (expense) => {
    const { value, currency, exchangeRates } = expense;
    const exchangeRate = exchangeRates[currency].ask;
    return parseFloat(value) * parseFloat(exchangeRate);
  };

  totalExpenses = () => {
    const { wallet } = this.props;
    const { expenses } = wallet;
    const total = expenses.reduce((acc, expense) => {
      const expenseValue = this.conversionValue(expense);
      return acc + expenseValue;
    }, 0);
    return total.toFixed(2);
  };

  render() {
    const { user } = this.props;
    const { email } = user;
    return (
      <div>
        <header>
          <div className="email-container">
            <p data-testid="email-field">{ email }</p>
          </div>
          <div className="expenses-container">
            <span>Despesa Total: R$</span>
            <span
              data-testid="total-field"
            >
              {`${this.totalExpenses()}`}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
