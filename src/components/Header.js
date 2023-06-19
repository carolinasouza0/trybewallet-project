import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';
import logo from '../assets/logo.png';
import moedas from '../assets/Moedas.png';
import emailPic from '../assets/email-pic.png';

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
      <div
        className="header-container"
      >
        <header
          className="header"
        >
          <img src={ logo } alt="logo" className="logo" />
          <div className="expenses-container">
            <img src={ moedas } alt="moedas" className="moedas" />
            <span
              className="expenses-text"
            >
              Total de despesas:

            </span>
            <span
              data-testid="total-field"
              className="expenses-total"
            >
              {`${this.totalExpenses()}`}
              <span
                data-testid="header-currency-field"
                className="currency-header"
              >
                BRL

              </span>
            </span>
          </div>
          <div className="email-container">
            <img src={ emailPic } alt="email" className="email-pic" />
            <p data-testid="email-field">{ email }</p>
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
