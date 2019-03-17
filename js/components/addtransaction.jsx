import React from 'react';

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
    .catch(err => {
      alert('Coś poszło nie tak, błąd połączenia');
    });
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
       })
       .catch(err => {
         alert('Coś poszło nie tak, błąd połączenia');
       });
     })
     .catch(err => {
       alert('Coś poszło nie tak, błąd połączenia');
     });
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

export default AddTransaction;
