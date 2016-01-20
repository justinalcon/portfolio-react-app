import React from 'react';

export default class BtnChipImage extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    cbClick: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    add_class: ""
  };

  handleClick = () => {
    this.props.cbClick();
  };

  render() {

    let className = "btn-chip "+this.props.add_class;

    return (
      <svg className={className} width="100%" height="100%" viewBox="0 0 37 37" onClick={this.handleClick}>
          <circle className="btn-chip__circle" fill="#C8C8C8" cx="18.5" cy="18.5" r="18.5"></circle>
          <path className="btn-chip__icon" d="M13.3659266,14.9390524 C12.6783972,14.9390524 12.1204023,14.3993628 12.1204023,13.7343881 C12.1204023,13.0694134 12.6783972,12.5297238 13.3659266,12.5297238 C14.053456,12.5297238 14.6114509,13.0694134 14.6114509,13.7343881 C14.6114509,14.3993628 14.053456,14.9390524 13.3659266,14.9390524 L13.3659266,14.9390524 Z M13.3659266,11.3250595 C11.990245,11.3250595 10.874878,12.4038364 10.874878,13.7343881 C10.874878,15.0649399 11.990245,16.1437168 13.3659266,16.1437168 C14.7416082,16.1437168 15.8569751,15.0649399 15.8569751,13.7343881 C15.8569751,12.4038364 14.7416082,11.3250595 13.3659266,11.3250595 L13.3659266,11.3250595 Z M27.0666936,19.2324761 L23.3301208,15.5413846 L17.1392424,21.6315651 L14.6114509,19.1553776 L9.62935376,23.5746886 L9.62935376,11.3250595 C9.62935376,10.6600848 10.1873486,10.1203952 10.874878,10.1203952 L25.8211694,10.1203952 C26.5086988,10.1203952 27.0666936,10.6600848 27.0666936,11.3250595 L27.0666936,19.2324761 L27.0666936,19.2324761 Z M27.0666936,25.7810313 C27.0666936,26.446006 26.5086988,26.9856956 25.8211694,26.9856956 L22.6027346,26.9856956 L18.0142232,22.4892861 L23.3301208,17.3477788 L27.0666936,20.9617717 L27.0666936,25.7810313 L27.0666936,25.7810313 Z M10.874878,26.9856956 C10.1873486,26.9856956 9.62935376,26.446006 9.62935376,25.7810313 L9.62935376,25.2154414 L14.5771989,20.9292458 L20.839695,26.9856956 L10.874878,26.9856956 L10.874878,26.9856956 Z M25.8211694,8.91573086 L10.874878,8.91573086 C9.49919647,8.91573086 8.38382948,9.99450775 8.38382948,11.3250595 L8.38382948,25.7810313 C8.38382948,27.1115831 9.49919647,28.19036 10.874878,28.19036 L25.8211694,28.19036 C27.1968509,28.19036 28.3122179,27.1115831 28.3122179,25.7810313 L28.3122179,11.3250595 C28.3122179,9.99450775 27.1968509,8.91573086 25.8211694,8.91573086 L25.8211694,8.91573086 Z M18.5,34.6875 C9.559875,34.6875 2.3125,27.4378125 2.3125,18.5 C2.3125,9.5621875 9.559875,2.3125 18.5,2.3125 C27.440125,2.3125 34.6875,9.5621875 34.6875,18.5 C34.6875,27.4378125 27.440125,34.6875 18.5,34.6875 L18.5,34.6875 Z M18.5,0 C8.283375,0 0,8.27875 0,18.5 C0,28.72125 8.283375,37 18.5,37 C28.716625,37 37,28.72125 37,18.5 C37,8.27875 28.716625,0 18.5,0 L18.5,0 Z" fill="#4A4A4A"></path>
      </svg>
    )
  }

}