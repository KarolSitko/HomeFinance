import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
  } from 'react-router-dom';

class Logged extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: ''
    }
  }

  inputHasChanged = (e) => {
      this.setState({
          name: e.target.value
      });
  }

  LoginOn = () => {
      if ( typeof this.props.onButtonClicked === 'function' ){
          this.props.onButtonClicked(this.state.name);
      }
  }

  render(){
    return(
      <div className={'login'}>
        <h5>Podaj nazwę urzytkownika</h5>
        <input type="text" value={this.state.name} onChange={this.inputHasChanged} />
        <button onClick={this.LoginOn}>Zaloguj</button>
      </div>
    )
  }
}

class Menu extends React.Component {
  constructor(){
    super();
    this.state = {
      menuState: 'hidden'
    }
  }
  changeMenuState = () => {
    let viewHamburger;
    if (this.state.menuState == 'hidden'){
      viewHamburger = 'visible';
    } else if (this.state.menuState == 'visible'){
      viewHamburger = 'hidden';
    }
    this.setState({
      menuState: viewHamburger
    })
  }
  changeMenu = () => {
    this.setState({
      menuState: 'hidden'
    })
  }
  render(){
    return(
      <div>
        <nav className={'menu'}>
          <ul>
            <li>
              <Link to="/transaction">Dodaj</Link>
            </li>
            <li>
              <Link to="/statistic">Statystyki</Link>
            </li>
            <li>
              <Link to="/exit">Wyjście</Link>
            </li>
          </ul>
        </nav>
        <div className={'hamburger'}>
          <img  onClick={this.changeMenuState}  src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hamburger_icon.svg" alt="Otwórz menu" />
          <div className={'hamburgerMenu'} style={ {visibility: `${this.state.menuState}`} } >
              <ul>
                <li>
                  <Link to="/transaction" onClick={this.changeMenuState} >Dodaj</Link>
                </li>
                <li>
                  <Link to="/statistic" onClick={this.changeMenuState} >Statystyki</Link>
                </li>
                <li>
                  <Link to="/exit" onClick={this.changeMenuState} >Wyjście</Link>
                </li>
              </ul>
            </div>

        </div>
      </div>
    )
  }
}

class Head extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }
  render(){
    return(
      <header>
        <div className={'container'}>
          <Link to='/' ><h1 className={'logo'}>HomeFinance</h1></Link>
          <Menu />
        </div>
      </header>
    )
  }
}

class Hello extends React.Component{
  render(){
      return(
        <div className={'box'}>
          <h1>Witaj {this.props.name}, Dzisiaj jest {this.props.date.toLocaleDateString()}</h1>
          <h1></h1>
        </div>
      )
  }
}

class Button extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  OnClickButton = () => {
      if ( typeof this.props.onButtonClicked === 'function' ){
          this.props.onButtonClicked(this.state.name);
      }
  }

  render(){
    return(
      <button className={'buttonmenu'} onClick={this.OnClickButton}>{this.props.buttontext}</button>
    )
  }
}

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

class AddTransaction extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      year: this.props.date.getFullYear(),
      month: this.props.date.getMonth()+1,
      day: this.props.date.getDate(),
      categoryMain: '',
      category: '',
      value: 0,
      allData: false
    }
  }

  passYearValue = (e) => {
      this.setState({
          year: e.target.value,
      });
  }

  passMonthValue = (e) => {
    let maxdate = '';
    if(e.target.value > 12){
      maxdate = 12;
    } if (e.target.value <1){
      maxdate = 1;
    } if (e.target.value >0 && e.target.value <=12) {
      maxdate = e.target.value;
    }
      this.setState({
          month: maxdate
      });
  }

  passDayValue = (e) => {
    let max = 31;
    let maxdate = '';
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

      this.setState({
          day: maxdate
      });
  }
  changeSelectMain = (e) => {
    let newCategory;
    let newAllData;
    if (e.target.value == 'Koszt') {
      newCategory = 'Żywność';
    } if (e.target.value == 'Wpływ') {
      newCategory = 'Wynagrodzenie';
    }
    if (newCategory != ''){
      newAllData = true;
    }
      this.setState({
          categoryMain: e.target.value,
          category: newCategory,
          allData: newAllData
      });
  }

  changeSelectCategory = (e) => {
      this.setState({
          category: e.target.value
      });
  }

  passValue = (e) => {
    let newValue = Math.round(e.target.value * 100) / 100;
      this.setState({
          value: newValue
      });
  }

  addChangeStatistic = (id, meth, obj) => {
    fetch(`http://localhost:3000/stats/${id}`, { method: meth, body: JSON.stringify(obj),headers: {
           "Content-Type": "application/json",
           // "Content-Type": "application/x-www-form-urlencoded",
       } })
    .then(resp => resp.json())
    .then(data => {
    })
  }

  sendTransaction = (e) => {
    let yearId = 0;
    let index;
    let month = this.state.month;
    let amount = this.state.value;
    let categoryMain = "cost";
    let exist = false;
    let monthId = 0;
    let addData = {
      "user": this.state.name,
      "categoryMain": this.state.categoryMain,
      "category": this.state.category,
      "year": this.state.year,
      "month":this.state.month,
      "day":this.state.day,
      "value": this.state.value
    };
    let addStatistic = {
    }
    if (this.state.categoryMain == "Wpływ") {
      categoryMain = "income";
    }
    addStatistic[this.state.year] = [];
    for (let i=0; i<12; i++){
      addStatistic[this.state.year].push({month: i+1,target: null, income: 0, cost: 0});
    }
     fetch(`http://localhost:3000/items/`, { method: 'POST', body: JSON.stringify(addData),headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        } })
     .then(resp => resp.json())
     .then(data => {
       const stats = fetch(`http://localhost:3000/stats/`);
       stats.then((response) => response.json())
       .then((response) => {
         if (response.length == 0){
           addStatistic[`${this.state.year}`][month-1][categoryMain] = +amount;
           this.addChangeStatistic('', 'POST', addStatistic);
         } else {exist = response.some((e) => {
           yearId = e.id;
           index = response.indexOf(e);
           return e[this.state.year] != undefined;
            })
            if (exist === true){
              let addStatistics = response[index];
              addStatistics[`${this.state.year}`][month-1][categoryMain] = addStatistics[`${this.state.year}`][month-1][categoryMain]+amount;
              this.addChangeStatistic(`${yearId}`, 'PUT', addStatistics);
            } else if (exist === false) {
              addStatistic[`${this.state.year}`][month-1][categoryMain] = +amount;
              this.addChangeStatistic(``, 'POST', addStatistic);
            }
          }
       });
     })
     this.setState({
       categoryMain: '',
       category: '',
       value: 0,
       allData: false
     })
  }

  render(){
    let month = ['', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    let main = ['', 'Koszt', 'Wpływ'];
    let cost = ['Żywność', 'Ubrania','Środki czystości', 'Rozrywka', 'Restauracje', 'Podróże', 'Opłaty','Inne'];
    let income = ['Wynagrodzenie', '500+', 'Wynajem', 'Inne'];
    return(
      <div>
        <h5>{this.state.name} Wprowadź dane dodawanej operacji. Dzisiaj jest</h5>
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
        {
          this.state.categoryMain =='Koszt' && <div>
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
        {
          this.state.category =='Wpływ' && <div>
          <p>Wybierz szczeóły operacji</p>
          <select value={this.state.categoryIncome} onChange={this.changeSelectIncome} >
              {
                  income.map((e, index) => {
                      return <option key={index} value={e}>{ e }</option>
                  })
              }
          </select>
          </div>
        }
        {
          this.state.allData && <div>
          <p>Podaj wartość w PLN</p>
          <input type="number" value={this.state.value} onChange={this.passValue} />
          <span>zł</span>
          <input type="submit" onClick={this.sendTransaction} value="Dodaj Transakcje" />
          </div>
        }
      </div>
    )
  }
}

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

class OperationHistory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      operations: null,
      loading: true,
      month: this.props.date.getMonth()+1,
      year: this.props.date.getFullYear(),
      newMonth: this.props.date.getMonth()+1,
      newYear: this.props.date.getFullYear()
    }
  }
  OperationData = () => {
      const operation = fetch('http://localhost:3000/items/');
      operation.then((response) => response.json())
      .then((response) => {
        let selectOperations = [];
        response.forEach((e) => {
          if (e.month == this.state.month && e.year == this.state.year){
            selectOperations.push(e);
          }
        });
        let sortOperations = selectOperations.sort((a,b) => {
          return a.day - b.day;
        })
          this.setState({
              operations: selectOperations,
              loading: false
          });
      })
  }
  changeYearView = (e) => {
      this.setState({
          newYear: e.target.value
      });
  }

  changeMonthView = (e) => {
    let maxdate = '';
    if(e.target.value > 12){
      maxdate = 12;
    } if (e.target.value <1){
      maxdate = 1;
    } if (e.target.value >0 && e.target.value <=12) {
      maxdate = e.target.value;
    }
      this.setState({
          newMonth: maxdate
      });
  }
  changePeriod = () => {
    this.setState({
      month: this.state.newMonth,
      year: this.state.newYear
    })
    this.OperationData();
  }
  deleteOperation = (id) => {
    const deleteOperation = fetch(`http://localhost:3000/items/${id}`, { method: 'DELETE' });
    deleteOperation.then(() => {
        this.OperationData();
    })
  }
  editOperation = (e) => {
    let id = e.id;

    fetch(`http://localhost:3000/items/${id}`, { method: 'PUT', body: JSON.stringify(e),headers: {
           "Content-Type": "application/json",
           // "Content-Type": "application/x-www-form-urlencoded",
       } })
    .then(resp => resp.json())
    .then(data => {
    })
  }
  componentDidMount(){
    this.OperationData();
  }
  render(){
    let month = ['', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

    return(
      <div className={'boxright'}>
        <h3>{this.props.name}, poniżej znajduje się historia twoich operacji za:</h3>
        <div>
        <p>Miesiąc {month[this.state.month]}</p>
        <input type="number" value={this.state.newMonth} onChange={this.changeMonthView} />
        <p>Rok {this.state.year}</p>
        <input type="number" value={this.state.newYear} onChange={this.changeYearView} />
        <Button buttontext={'Zatwierdź nowy okres'} onButtonClicked={this.changePeriod} />
        </div>
        {!this.state.loading ? <OperationList operations={this.state.operations} deleteOperation={this.deleteOperation} editOperation={this.editOperation}/> : <h3>Ładowanie danych ...</h3>}
      </div>
    )
  }
}

class Exit extends React.Component {
  constructor(props){
    super(props);
  }


  LoginOff = () => {
      if ( typeof this.props.onButtonClicked === 'function' ){
          this.props.onButtonClicked();
      }
  }

  render(){
    return(
      <div className={'login'}>
        <h5>Czy napewno chcesz wyjść z aplikacji?</h5>
        <button onClick={this.LoginOff}>Tak wologój</button>
      </div>
    )
  }
}

class Foot extends React.Component{
  constructor(){
    super();
    this.state={

    }
  }
  render(){
    return(

      <footer>
        <div className={'container'}>Created by Karol Sitko</div>
      </footer>
    )
  }
}

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      userName: null,
      login: false,
      currentDate: new Date()
      }
    }

    componentDidMount() {
            this.setState({
                currentDate: new Date()
            });
    }
    componentWillUnmount() {

    }

    LoginOn = (user) => {
        const users = fetch(`http://localhost:3000/users/`);
        users.then((response) => response.json())
        .then((response) => {

          if (this.state.login === false){
            response.some((e)=>{
              if(e.name == user){
                this.setState({
                  userName: user,
                  login: true
                })
              }else{
                alert('błędne dane logowania');
              }
            })
          }
        })
      }

      LoginOff = () => {
        this.setState({
          userName: null,
          login: false
        })
      }


    render() {
      let page = '';
      if (this.state.login === true){
        page=(
          <div className={'mainbox'}>
            <Head/>
            <Switch>
              <Route exact path='/' render={(props) => (<Hello name={this.state.userName} date={this.state.currentDate}/>)} />
              <Route path='/transaction' render={(props) => (<Transaction name={this.state.userName} buttonState={0} date={this.state.currentDate}/>)} />
              <Route path='/statistic' render={(props) => (<Statistic name={this.state.userName} buttonState={0} date={this.state.currentDate}/>)} />
              <Route path='/exit' render={(props) => (<Exit onButtonClicked={this.LoginOff}/>)} />
            </Switch>
            <Foot/>
          </div>
        )
      } else {
        page = (
          <div className={'mainbox'}>
            <Logged onButtonClicked={this.LoginOn} />
          </div>
        )}
        return (
            <HashRouter>
                {page}
            </HashRouter>
        )
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
