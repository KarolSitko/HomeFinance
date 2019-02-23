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
        <button onClick={this.LoginOn}>Zalogój</button>
      </div>
    )
  }
}

class Menu extends React.Component {
  constructor(){
    super();
    this.state = {
    }
  }
  render(){
    return(
      <nav className={'menu'}>
        <ul>
          <li>
            <Link to="/transaction">Transakcje</Link>
          </li>
          <li>
            <Link to="/statistic">Statystyki</Link>
          </li>
          <li>
            <Link to="/exit">Wyjście</Link>
          </li>
          </ul>
      </nav>
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
          <h1>Witaj {this.props.name}</h1>
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
  render(){
    return(
      <button className={'buttonmenu'}>{this.props.buttontext}</button>
    )
  }
}

class AddTransaction extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      loading: true
    }
  }
  render(){
    return(
      <h7>Input dodający transakcje</h7>
    )
  }
}

class Transaction extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return (
        <div className={'box'}>
          <div className={'mleft'}>
            <Button buttontext={'Dodaj'}/>
            <Button buttontext={'Usuń'}/>
            <Button buttontext={'Edytuj'}/>
            <Button buttontext={'Płatności Stałe'}/>
            <Button buttontext={'Przychody Stałe'}/>
            <Button buttontext={'Zdefiniuj swoje cele'}/>
          </div>
          <div className={'mright'}>Tu powstaną inputy
            <AddTransaction />
          </div>
        </div>
    )
  }
}

class Statistic extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return (
        <div className={'box'}>
          <div className={'mleft'}>
            <Button buttontext={'Wykaz Operacji'}/>
            <Button buttontext={'Podsumowanie'}/>
            <Button buttontext={'Wydatki'}/>
            <Button buttontext={'Przychody'}/>
            <Button buttontext={'Cel'}/>
          </div>
          <div className={'mright'}>Tu powstaną tabele i wykresy obrazujące finanse domowe</div>
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
      login: false
      }
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
          name: null,
          login: false
        })
        console.log(this.state.login);
      }


    render() {
      let page = '';
      if (this.state.login === true){
        // console.log(this.state.userName);
        page=(
          <div className={'mainbox'}>
            <Head/>
            <Switch>
              <Route exact path='/' render={(props) => (<Hello name={this.state.userName}/>)} />
              <Route path='/transaction' component={Transaction} />
              <Route path='/statistic' component={Statistic} />
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
