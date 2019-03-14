import React from 'react';

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

export default Button;
