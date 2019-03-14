import React from 'react';

class OperationEdit extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        newOperation: this.props.operation,
        name: this.props.operation.user,
        year: this.props.operation.year,
        month: this.props.operation.month,
        day: this.props.operation.day,
        categoryMain: this.props.operation.categoryMain,
        category: this.props.operation.category,
        value: this.props.operation.value
    }
  }
  passYearValue = (e) => {
      let changeOperation = this.state.newOperation;
      changeOperation.year = e.target.value;
      this.setState({
          newOperation: changeOperation,
          year: e.target.value
      });
  }
  passMonthValue = (e) => {
    let maxdate = '';
    let changeOperation = this.state.newOperation;
    if(e.target.value > 12){
      maxdate = 12;
    } if (e.target.value <1){
      maxdate = 1;
    } if (e.target.value >0 && e.target.value <=12) {
      maxdate = e.target.value;
    }
    changeOperation.month = maxdate;
    this.setState({
        newOperation: changeOperation,
        month: maxdate
    });
  }
  passDayValue = (e) => {
    let max = 31;
    let maxdate = '';
    let changeOperation = this.state.newOperation;
    if (this.state.month == 4 || this.state.month == 6 || this.state.month == 9 || this.state.month == 11){
      max = 30;
    } if (this.state.month == 2 && this.state.year % 4 != 0){
      max = 28;
    } if (this.state.month == 2 && this.state.year % 4 == 0){
      max = 29;
    }
    if(e.target.value > max){
      maxdate = max;
    } if (e.target.value <1){
      maxdate = 1;
    } if (e.target.value >0 && e.target.value <=max) {
      maxdate = e.target.value;
    }

    changeOperation.day = maxdate;
    this.setState({
        newOperation: changeOperation,
        day: maxdate
    });
  }
  changeSelectMain = (e) => {
    let changeOperation = this.state.newOperation;
    let newCategory;
    if (e.target.value == 'Koszt') {
      newCategory = 'Żywność';
    } if (e.target.value == 'Wpływ') {
      newCategory = 'Wynagrodzenie';
    }
    changeOperation.categoryMain = e.target.value;
    changeOperation.category = newCategory;
      this.setState({
          newOperation: changeOperation,
          categoryMain: e.target.value,
          category: newCategory
      });
  }
  changeSelectCategory = (e) => {
      let changeOperation = this.state.newOperation;
      changeOperation.category = e.target.value;
      this.setState({
          newOperation: changeOperation,
          category: e.target.value
      });
  }
  passValue = (e) => {
    let changeOperation = this.state.newOperation;
    let newValue = Math.round(e.target.value * 100) / 100;
    changeOperation.value = newValue;
      this.setState({
        newOperation: changeOperation,
          value: newValue
      });
  }
  onClickButton = () => {
      if ( typeof this.props.editOperation === 'function' ){
          this.props.editOperation(this.state.newOperation);
      }
  }
  onClickButtonExit = () => {
      this.setState({
        newOperation: this.props.operation
      })
      if ( typeof this.props.exit === 'function' ){
          this.props.exit();
      }
  }
  render(){
    let month = ['', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    let main = ['Koszt', 'Wpływ'];
    let cost = ['Żywność', 'Ubrania','Środki czystości', 'Rozrywka', 'Restauracje', 'Podróże', 'Opłaty','Inne'];
    let income = ['Wynagrodzenie', '500+', 'Wynajem', 'Inne'];
    return(
      <div className={'boxEdit'}>
        <h5>Edytuj transakcje</h5>
        <div>
          <p>Rok {this.state.year}</p>
          <input type="number" value={this.state.year} onChange={this.passYearValue} />
        </div>
        <div>
          <p>Miesiąc {month[this.state.month]}</p>
          <input type="number" value={this.state.month} onChange={this.passMonthValue} />
        </div>
        <div>
          <p>Dzień {this.state.day}</p>
          <input type="number" value={this.state.day} onChange={this.passDayValue} />
        </div>
        <p>Rodzaj Operacji</p>
        <select value={this.state.categoryMain} onChange={this.changeSelectMain} >
          {
              main.map((e, index) => {
                  return <option key={index} value={e}>{ e }</option>
              })
          }
        </select>
        {this.state.categoryMain =='Koszt' && <div>
          <p>Wybierz szczeóły operacji</p>
          <select value={this.state.category} onChange={this.changeSelectCategory} >
              {
                  cost.map((e, index) => {
                      return <option key={index} value={e}>{ e }</option>
                    })
              }
          </select>
          </div>
        }
        {
          this.state.categoryMain =='Wpływ' && <div>
          <p>Wybierz szczeóły operacji</p>
          <select value={this.state.category} onChange={this.changeSelectCategory} >
              {
                  income.map((e, index) => {
                      return <option key={index} value={e}>{ e }</option>
                  })
              }
          </select>
          </div>
        }
          <p>Podaj wartość w PLN</p>
          <input type="number" value={this.state.value} onChange={this.passValue} />
          <span>zł</span>
        <button onClick={this.onClickButton} className={'buttonmenu'}>Zatwierdź zmiany</button>
        <button onClick={this.onClickButtonExit} className={'buttonmenu'}>Nie edytuj</button>
      </div>
    )
  }
}

export default OperationEdit;
