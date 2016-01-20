import React from 'react';
import BtnChipMenu from '../Buttons/Chips/BtnChipMenu';

export default class FloatingMenuChip extends React.Component {
  constructor() {
    super();

    this.state = {
      is_open: false
    }
  }

  open = () => {
    this.setState({
      is_open: true
    })
  };

  close = () => {
    this.setState({
      is_open: false
    })
  };

  render() {

    let toggle_class = "floating-menu";
    if(this.state.is_open){
      toggle_class += " floating-menu--toggle-open"
    }

    return (
      <div className={toggle_class} onMouseOver={this.open} onMouseOut={this.close}>

        <BtnChipMenu />

        <div className="floating-menu__sub-menu">
          {this.props.children}
        </div>

      </div>
    )
  }

}