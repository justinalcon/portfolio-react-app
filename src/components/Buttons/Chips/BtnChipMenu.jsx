import React from 'react';

export default class BtnChipMenu extends React.Component {
  constructor() {
    super();
  }

  static defaultProps = {
    add_class: ""
  };

  render() {

    let className = "btn-chip "+this.props.add_class;

    return (
      <svg className={className} width="100%" height="100%" viewBox="0 0 42 42" version="1.1">
          <circle className="btn-chip__circle" fill="#FFFFFF" cx="20.7162162" cy="20.7162162" r="19.2567568"></circle>
          <path className="btn-chip__icon" d="M20.963656,38.8634116 C10.9829454,38.8634116 2.89201231,30.7698968 2.89201231,20.7917678 C2.89201231,10.8136388 10.9829454,2.72012412 20.963656,2.72012412 C30.9443667,2.72012412 39.0352998,10.8136388 39.0352998,20.7917678 C39.0352998,30.7698968 30.9443667,38.8634116 20.963656,38.8634116 L20.963656,38.8634116 Z M20.963656,0.138460726 C9.55786718,0.138460726 0.310348923,9.38081566 0.310348923,20.7917678 C0.310348923,32.20272 9.55786718,41.445075 20.963656,41.445075 C32.3694449,41.445075 41.6169632,32.20272 41.6169632,20.7917678 C41.6169632,9.38081566 32.3694449,0.138460726 20.963656,0.138460726 L20.963656,0.138460726 Z M28.4227502,24.8936881 L17.5813306,24.8936881 C17.2482581,24.8936881 16.9790296,25.2221779 16.9790296,25.6269242 C16.9790296,26.0324038 17.2482581,26.3601603 17.5813306,26.3601603 L28.4227502,26.3601603 C28.7558227,26.3601603 29.0250512,26.0324038 29.0250512,25.6269242 C29.0250512,25.2221779 28.7558227,24.8936881 28.4227502,24.8936881 L28.4227502,24.8936881 Z M17.5813306,16.9747382 L28.4227502,16.9747382 C28.7558227,16.9747382 29.0250512,16.6469816 29.0250512,16.2415021 C29.0250512,15.8360225 28.7558227,15.508266 28.4227502,15.508266 L17.5813306,15.508266 C17.2482581,15.508266 16.9790296,15.8360225 16.9790296,16.2415021 C16.9790296,16.6469816 17.2482581,16.9747382 17.5813306,16.9747382 L17.5813306,16.9747382 Z M28.4227502,20.200977 L17.5813306,20.200977 C17.2482581,20.200977 16.9790296,20.5294668 16.9790296,20.9342131 C16.9790296,21.3396927 17.2482581,21.6674492 17.5813306,21.6674492 L28.4227502,21.6674492 C28.7558227,21.6674492 29.0250512,21.3396927 29.0250512,20.9342131 C29.0250512,20.5294668 28.7558227,20.200977 28.4227502,20.200977 L28.4227502,20.200977 Z M13.6270931,14.555059 C12.8176004,14.555059 12.1606209,15.2120386 12.1606209,16.0215312 C12.1606209,16.8310239 12.8176004,17.4880035 13.6270931,17.4880035 C14.4365857,17.4880035 15.0935653,16.8310239 15.0935653,16.0215312 C15.0935653,15.2120386 14.4365857,14.555059 13.6270931,14.555059 L13.6270931,14.555059 Z M13.6270931,19.3210937 C12.8176004,19.3210937 12.1606209,19.9780733 12.1606209,20.7875659 C12.1606209,21.5970586 12.8176004,22.2540381 13.6270931,22.2540381 C14.4365857,22.2540381 15.0935653,21.5970586 15.0935653,20.7875659 C15.0935653,19.9780733 14.4365857,19.3210937 13.6270931,19.3210937 L13.6270931,19.3210937 Z M13.6270931,24.0871284 C12.8176004,24.0871284 12.1606209,24.7441079 12.1606209,25.5536006 C12.1606209,26.3630932 12.8176004,27.0200728 13.6270931,27.0200728 C14.4365857,27.0200728 15.0935653,26.3630932 15.0935653,25.5536006 C15.0935653,24.7441079 14.4365857,24.0871284 13.6270931,24.0871284 L13.6270931,24.0871284 Z" fill="#4A4A4A"></path>
      </svg>
    )
  }

}