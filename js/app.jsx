import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
  } from 'react-router-dom';
import Logged from './components/logged.jsx';
import Head from './components/head.jsx';
import Transaction from './components/transaction.jsx';
import Statistic from './components/statistic.jsx';

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
