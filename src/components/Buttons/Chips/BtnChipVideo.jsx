import React from 'react';

export default class BtnChipVideo extends React.Component {
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
          <path className="btn-chip__icon" d="M28.5907084,26.4776776 L24.4861862,23.0572424 L24.4861862,21.0049813 L28.5907084,18.2686332 L28.5907084,26.4776776 L28.5907084,26.4776776 Z M21.0657511,16.9086682 C19.1721982,16.9086682 17.637791,15.3735769 17.637791,13.480024 C17.637791,11.5864711 19.1721982,10.0520639 21.0657511,10.0520639 C22.959304,10.0520639 24.4937112,11.5864711 24.4937112,13.480024 C24.4937112,15.3735769 22.959304,16.9086682 21.0657511,16.9086682 L21.0657511,16.9086682 Z M23.1180122,25.1095035 C23.1180122,25.8647356 22.5050702,26.4776776 21.7498381,26.4776776 L10.8044456,26.4776776 C10.0492136,26.4776776 9.43627158,25.8647356 9.43627158,25.1095035 L9.43627158,19.6368073 C9.43627158,18.8815752 10.0492136,18.2686332 10.8044456,18.2686332 L21.7498381,18.2686332 C22.5050702,18.2686332 23.1180122,18.8815752 23.1180122,19.6368073 L23.1180122,25.1095035 L23.1180122,25.1095035 Z M9.43627158,14.164111 C9.43627158,12.6529628 10.6614714,11.4277629 12.1726197,11.4277629 C13.6837679,11.4277629 14.9089678,12.6529628 14.9089678,14.164111 C14.9089678,15.6752593 13.6837679,16.9004592 12.1726197,16.9004592 C10.6614714,16.9004592 9.43627158,15.6752593 9.43627158,14.164111 L9.43627158,14.164111 Z M28.5907084,16.9004592 L24.4861862,19.6368073 C24.4861862,18.8063256 24.1085702,18.0716161 23.5243599,17.5701804 C24.9144247,16.7314897 25.8543603,15.2217096 25.8543603,13.480024 C25.8543603,10.8353436 23.7104315,8.69141481 21.0657511,8.69141481 C18.4210706,8.69141481 16.2771419,10.8353436 16.2771419,13.480024 C16.2771419,14.8222028 16.8326205,16.0309845 17.7212496,16.9004592 L15.2120184,16.9004592 C15.8666896,16.1732746 16.2771419,15.2203414 16.2771419,14.164111 C16.2771419,11.8977307 14.439,10.0595889 12.1726197,10.0595889 C9.90623936,10.0595889 8.06809752,11.8977307 8.06809752,14.164111 C8.06809752,15.4016245 8.62631253,16.4968478 9.49236671,17.2500276 C8.64751923,17.7152068 8.06809752,18.6038359 8.06809752,19.6368073 L8.06809752,25.1095035 C8.06809752,26.6206517 9.29329739,27.8458516 10.8044456,27.8458516 L21.7498381,27.8458516 C23.2609863,27.8458516 24.4861862,26.6206517 24.4861862,25.1095035 L24.4861862,24.4254165 L28.5907084,27.8458516 C29.3459405,27.8458516 29.9588824,27.2329096 29.9588824,26.4776776 L29.9588824,18.2686332 C29.9588824,17.5134011 29.3459405,16.9004592 28.5907084,16.9004592 L28.5907084,16.9004592 Z M18.5,34.6875 C9.559875,34.6875 2.3125,27.4378125 2.3125,18.5 C2.3125,9.5621875 9.559875,2.3125 18.5,2.3125 C27.440125,2.3125 34.6875,9.5621875 34.6875,18.5 C34.6875,27.4378125 27.440125,34.6875 18.5,34.6875 L18.5,34.6875 Z M18.5,0 C8.283375,0 0,8.27875 0,18.5 C0,28.72125 8.283375,37 18.5,37 C28.716625,37 37,28.72125 37,18.5 C37,8.27875 28.716625,0 18.5,0 L18.5,0 Z" fill="#4A4A4A"></path>
      </svg>
    )
  }

}