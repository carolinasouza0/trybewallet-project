import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';
import '../styles/Table.css';

class Table extends Component {
  handleDelete = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(deleteExpense(newExpenses));
  };

  handleEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div
        className="table-container"
      >
        <table
          className="table"
        >
          <thead>
            <tr>
              <th
                className="description-table"
              >
                Descrição

              </th>
              <th
                className="tag-table"
              >
                Tag

              </th>
              <th
                className="method-table"
              >
                Método de pagamento

              </th>
              <th
                className="value-table"
              >
                Valor

              </th>
              <th
                className="coin-table"
              >
                Moeda

              </th>
              <th
                className="currency-table"
              >
                Câmbio utilizado

              </th>
              <th
                className="converted-value-table"
              >
                Valor convertido

              </th>
              <th
                className="currency-conversion-table"
              >
                Moeda de conversão

              </th>
              <th
                className="edit-delete-table"
              >
                Editar/Excluir

              </th>
            </tr>
          </thead>
          { expenses.map((expense) => (
            <tbody key={ expense.id }>
              <tr>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  { Number(expense.value
                    * expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEdit(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(expense.id) }
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>

      </div>
    );
  }
}

Table.propTypes = {
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
