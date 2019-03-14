import React from 'react';
import OperationEdit from './operationedit.jsx';

class OperationList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      incomeSum: 0,
      costSum: 0,
      newOperation: '',
      edit: false
    }
  }
  buttonClickDelete = (id) => (e) => {
    if (this.state.edit == false){
      if ( typeof this.props.deleteOperation === 'function' ){
          this.props.deleteOperation(id);
      }
    }
  }
  buttonClickEdit = (operation) => (e) => {
    if (this.state.edit == false){
      this.setState({
        newOperation: operation,
        edit: true
      })
    }
  }
  editOperation = (e) => {
    if ( typeof this.props.editOperation === 'function' ){
        this.props.editOperation(e);
    }
    this.setState({
      edit: false,
    })
  }
  exit = (e) => {
    this.setState({
      edit: false
    })
  }
  render(){
    let incomes = 0;
    let costs = 0;
    const mappedOperations = this.props.operations.map((operation) => {
      if (operation.categoryMain == "Koszt"){
        costs = costs + operation.value;
      } if (operation.categoryMain == "Wpływ"){
        incomes = incomes + operation.value;
      }
        return(
          <tr key={operation.id} className={'row'}>
            <td>{operation.year}/{operation.month}/{operation.day}</td>
            <td>{operation.category}</td>
            {operation.categoryMain==='Koszt' ? <td>{operation.value}</td> : <td>-</td>}
            {operation.categoryMain==='Wpływ' ? <td>{operation.value}</td> : <td>-</td>}
            <td><button onClick={this.buttonClickDelete(operation.id)}>usuń</button></td>
            <td><button onClick={this.buttonClickEdit(operation)}>edytuj</button></td>
          </tr>
        )
    })
    return(
      <div>
        {this.state.edit && <OperationEdit editOperation={this.editOperation} exit={this.exit} operation={this.state.newOperation}/>}
      <table>
        <tbody>
          <tr>
            <th>Data</th>
            <th>Rodzaj operacji</th>
            <th>Kwota Rozchodu</th>
            <th>Kwota Przychodu</th>
          </tr>
          {mappedOperations}
          <tr>
            <th>Razem</th>
            <th></th>
            <th>{costs}</th>
            <th>{incomes}</th>
          </tr>
        </tbody>
      </table>
      </div>
    )
  }
}

export default OperationList;
