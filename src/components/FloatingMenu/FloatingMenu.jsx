import React from 'react';
import BtnChipMenu from '../Buttons/Chips/BtnChipMenu';

export default class FloatingMenuChip extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="floating-menu">
        
        <BtnChipMenu />

        <div className="floating-menu__sub-menu">
          {this.props.children}
        </div>

      </div>
    )
  }

}