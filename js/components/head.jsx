import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
  } from 'react-router-dom';
import Menu from './menu.jsx'

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

export default Head;
