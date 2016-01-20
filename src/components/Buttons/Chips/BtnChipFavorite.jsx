import React from 'react';
import BtnChip from './BtnChip';

import connectToStores from 'alt-utils/lib/connectToStores';
import PostsStore from '../../../js/stores/PostsStore';

class BtnChipFavorite extends BtnChip {
  
  // Connects PostsStore.state into this.props. Using connectToStores alt util.
  static getStores(props) {
    return [PostsStore]
  };
  static getPropsFromStores(props) {
    return PostsStore.getState()
  };

  handleClick = () => {
    alert(`Favorite post w/ id: ${this.props.selected_post.id}`);
  };

  svgBodyRender() {
    return (
      <g>
        <circle className="btn-chip__circle" fill="#C8C8C8" cx="18.5" cy="18.5" r="18.5"></circle>
        <path className="btn-chip__icon" d="M18.5,0 C8.283375,0 0,8.27875 0,18.5 C0,28.72125 8.283375,37 18.5,37 C28.716625,37 37,28.72125 37,18.5 C37,8.27875 28.716625,0 18.5,0 L18.5,0 Z M18.5,34.6875 C9.559875,34.6875 2.3125,27.4378125 2.3125,18.5 C2.3125,9.5621875 9.559875,2.3125 18.5,2.3125 C27.440125,2.3125 34.6875,9.5621875 34.6875,18.5 C34.6875,27.4378125 27.440125,34.6875 18.5,34.6875 L18.5,34.6875 Z M18.4751761,23.1841383 L13.3539096,26.0553289 L14.3314242,20.2619349 L9.92295745,15.7610937 L15.8866237,14.9855621 L18.4751761,9.46791268 L21.0409796,14.9855621 L26.9846544,15.8286512 L22.618928,20.2833051 L23.5316427,26.0766991 L18.4751761,23.1841383 L18.4751761,23.1841383 Z M29.50496,14.9352387 L21.8957878,13.7743539 L18.4751761,6.49469657 L15.0545644,13.7743539 L7.44539225,14.9352387 L12.9499438,20.5714582 L11.6470505,28.5542643 L18.4751761,24.7834569 L25.3033017,28.5542643 L24.0004085,20.5714582 L29.50496,14.9352387 L29.50496,14.9352387 Z" fill="#4A4A4A"></path>
      </g>
    )
  }
  
}

export default BtnChipFavorite = connectToStores(BtnChipFavorite);