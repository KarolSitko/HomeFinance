import React from 'react';
import Button from './button.jsx';
import AddTransaction from './addtransaction.jsx';

class Transaction extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonStatus: this.props.buttonState
    }
  }
  ClickAddTransaction= () => {
    this.setState({
      buttonStatus: 1
    })
  }
  ClickAddEarn = () => {
    this.setState({
      buttonStatus: 2
    })
  }
  ClickAddCost= () => {
    this.setState({
      buttonStatus: 3
    })
  }
  ClickAddGoal= () => {
    this.setState({
      buttonStatus: 4
    })
  }
  render(){
    let boxright = '';
    if (this.state.buttonStatus === 0){
      boxright = (<h3>{this.props.name}, jesteś w module dodawania operacji. Wybierz z prawej strony co chcesz dodać</h3>)
    } if (this.state.buttonStatus === 1){
      boxright = (<AddTransaction date={this.props.date} name={this.props.name}/>)
    } if (this.state.buttonStatus === 2){
      boxright = (<h3> Tu w przyszłości dodasz stałe koszty</h3>)
    } if (this.state.buttonStatus === 3){
      boxright = (<h3> Tu w przyszłości dodasz stałe przychody</h3>)
    } if (this.state.buttonStatus === 4){
      boxright = (<h3> Tu w przyszłości dodasz swoje cele</h3>)
    }
    return (
        <div className={'box'}>
          <div className={'mleft'}>
            <Button buttontext={'Dodaj'} onButtonClicked={this.ClickAddTransaction} />
            <Button buttontext={'Płatności Stałe'} onButtonClicked={this.ClickAddCost} />
            <Button buttontext={'Przychody Stałe'} onButtonClicked={this.ClickAddEarn} />
            <Button buttontext={'Zdefiniuj swoje cele'} onButtonClicked={this.ClickAddGoal} />
          </div>
          <div className={'mright'}>
            {boxright}
          </div>
        </div>
    )
  }
}

export default Transaction;
