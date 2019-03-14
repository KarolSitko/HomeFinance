import React from 'react';
import Button from './button.jsx';
import OperationList from './operationlist.jsx';

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

export default OperationHistory;
