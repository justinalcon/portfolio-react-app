import React from 'react';

export default class BtnChipArticle extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    cbClick: React.PropTypes.func.isRequired
  };

  handleClick = () => {
    this.props.cbClick();
  };

  render() {
    return (
      <svg className="btn-chip" width="100%" height="100%" viewBox="0 0 37 37" onClick={this.handleClick}>
          <circle className="btn-chip__circle" fill="#C8C8C8" cx="18.5" cy="18.5" r="18.5"></circle>
          <path className="btn-chip__icon" d="M27.4623089,16.3412086 L9.75933292,16.3412086 C9.38280424,16.3412086 9.07844923,16.7479231 9.07844923,17.2490535 C9.07844923,17.7510918 9.38280424,18.1568985 9.75933292,18.1568985 L27.4623089,18.1568985 C27.8388376,18.1568985 28.1431926,17.7510918 28.1431926,17.2490535 C28.1431926,16.7479231 27.8388376,16.3412086 27.4623089,16.3412086 L27.4623089,16.3412086 Z M27.4623089,20.8804332 L9.75933292,20.8804332 C9.38280424,20.8804332 9.07844923,21.2871477 9.07844923,21.7882781 C9.07844923,22.2903164 9.38280424,22.6961231 9.75933292,22.6961231 L27.4623089,22.6961231 C27.8388376,22.6961231 28.1431926,22.2903164 28.1431926,21.7882781 C28.1431926,21.2871477 27.8388376,20.8804332 27.4623089,20.8804332 L27.4623089,20.8804332 Z M9.75933292,13.6176738 L27.4623089,13.6176738 C27.8388376,13.6176738 28.1431926,13.2118672 28.1431926,12.7098289 C28.1431926,12.2086985 27.8388376,11.801984 27.4623089,11.801984 L9.75933292,11.801984 C9.38280424,11.801984 9.07844923,12.2086985 9.07844923,12.7098289 C9.07844923,13.2118672 9.38280424,13.6176738 9.75933292,13.6176738 L9.75933292,13.6176738 Z M20.1861989,25.4196578 L9.77268358,25.4196578 C9.38877198,25.4196578 9.07844923,25.8254645 9.07844923,26.3275028 C9.07844923,26.829541 9.38877198,27.2353477 9.77268358,27.2353477 L20.1861989,27.2353477 C20.5701105,27.2353477 20.8804332,26.829541 20.8804332,26.3275028 C20.8804332,25.8254645 20.5701105,25.4196578 20.1861989,25.4196578 L20.1861989,25.4196578 Z M18.5,34.6875 C9.559875,34.6875 2.3125,27.4378125 2.3125,18.5 C2.3125,9.5621875 9.559875,2.3125 18.5,2.3125 C27.440125,2.3125 34.6875,9.5621875 34.6875,18.5 C34.6875,27.4378125 27.440125,34.6875 18.5,34.6875 L18.5,34.6875 Z M18.5,0 C8.283375,0 0,8.27875 0,18.5 C0,28.72125 8.283375,37 18.5,37 C28.716625,37 37,28.72125 37,18.5 C37,8.27875 28.716625,0 18.5,0 L18.5,0 Z" fill="#4A4A4A"></path>
      </svg>
    )
  }

}