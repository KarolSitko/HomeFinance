import React from 'react';
import Button from './button.jsx';
import OperationHistory from './operationhistory.jsx';

class Statistic extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonStatus: 0
    }
  }
  ClickViewHistory = () => {
    this.setState({
      buttonStatus: 1
    })
  }
  ClickViewStatistic = () => {
    this.setState({
      buttonStatus: 2
    })
  }
  ClickViewCost = () => {
    this.setState({
      buttonStatus: 3
    })
  }
  ClickViewIncome = () => {
    this.setState({
      buttonStatus: 4
    })
  }
  ClickViewGoal = () => {
    this.setState({
      buttonStatus: 5
    })
  }
  render(){
    let boxright = '';
    if (this.state.buttonStatus === 0){
      boxright = (<h3>{this.props.name}, jesteś w module statystyk. Wybierz z prawej strony co cię teraz interesuje</h3>)
    } if (this.state.buttonStatus === 1){
      boxright = (<OperationHistory className={'mright'} name={this.props.name} date={this.props.date}/>)
    } if (this.state.buttonStatus === 2){
      boxright = (<h3> Tu w przyszłości zobaczysz ile łącznie wydałeś a ile zarobiłeś</h3>)
    } if (this.state.buttonStatus === 3){
      boxright = (<h3> Tu w przyszłości zobaczysz szczegóły swoich wydatków</h3>)
    } if (this.state.buttonStatus === 4){
      boxright = (<h3> Tu w przyszłości zobaczysz szczegóły swoich dochodów</h3>)
    } if (this.state.buttonStatus === 5){
      boxright = (<h3> Tu w przyszłości zobaczysz i zmodyfikujesz swoje cele</h3>)
    }
    return (
        <div className={'box'}>
          <div className={'mleft'}>
            <Button buttontext={'Wykaz Operacji'} onButtonClicked={this.ClickViewHistory} />
            <Button buttontext={'Podsumowanie'} onButtonClicked={this.ClickViewStatistic} />
            <Button buttontext={'Wydatki'} onButtonClicked={this.ClickViewCost} />
            <Button buttontext={'Przychody'} onButtonClicked={this.ClickViewIncome} />
            <Button buttontext={'Cel'} onButtonClicked={this.ClickViewGoal} />
          </div>
          <div className={'mright'}>
            {boxright}
          </div>
        </div>
    )
  }
}

export default Statistic;
