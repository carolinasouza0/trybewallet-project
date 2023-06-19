import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions';
import '../styles/Login.css';
import logo from '../assets/logo.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    this.setState({ isDisabled: true }, () => {
      if (this.emailValidation() && this.passwordValidation()) {
        this.setState({
          isDisabled: false,
        });
      }
    });
  };

  emailValidation = () => {
    const { email } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
  };

  passwordValidation = () => {
    const { password } = this.state;
    const passwordLength = 6;
    return password.length >= passwordLength;
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(login(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div className="login-container">
        <form
          className="login-form"
        >
          <img src={ logo } alt="logo" className="logo" />
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
              className="email-input"
            />
          </label>

          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
              className="password-input"
            />
          </label>
          <button
            type="button"
            className="login-button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
