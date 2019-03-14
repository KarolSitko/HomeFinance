import React from 'react';

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

export default Logged
