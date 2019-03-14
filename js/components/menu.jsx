import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
  } from 'react-router-dom';

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

export default Menu
