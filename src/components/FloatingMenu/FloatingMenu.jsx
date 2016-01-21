import React from 'react';
import BtnChipMenu from '../Buttons/Chips/BtnChipMenu';

import {detectIsMobile} from '../../js/utils';

export default class FloatingMenuChip extends React.Component {
  constructor() {
    super();

    this.state = {
      is_open: false
    }

    this.isMobile = false;
  }

  componentDidMount() {
    this.isMobile = detectIsMobile();
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

  toggle = () => {
    this.setState({
      is_open: !this.state.is_open
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