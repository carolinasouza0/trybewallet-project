import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
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
              0
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
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
