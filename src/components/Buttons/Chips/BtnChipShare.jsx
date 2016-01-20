import React from 'react';
import BtnChip from './BtnChip';

export default class BtnChipShare extends BtnChip {
  
  handleClick = () => {
    let url = location.href;
    alert(`Share ${url}`);
  };

  svgBodyRender() {
    return (
      <g>
        <circle className="btn-chip__circle" fill="#C8C8C8" cx="18.5" cy="18.5" r="18.5"></circle>
        <path className="btn-chip__icon" d="M22.6961231,29.0510375 C21.191824,29.0510375 19.9725883,27.8318018 19.9725883,26.3275028 C19.9725883,24.8232037 21.191824,23.603968 22.6961231,23.603968 C24.2004221,23.603968 25.4196578,24.8232037 25.4196578,26.3275028 C25.4196578,27.8318018 24.2004221,29.0510375 22.6961231,29.0510375 L22.6961231,29.0510375 Z M9.98629415,21.7882781 C8.48199511,21.7882781 7.26275938,20.5690424 7.26275938,19.0647434 C7.26275938,17.5613522 8.48199511,16.3412086 9.98629415,16.3412086 C11.4905932,16.3412086 12.7098289,17.5613522 12.7098289,19.0647434 C12.7098289,20.5690424 11.4905932,21.7882781 9.98629415,21.7882781 L9.98629415,21.7882781 Z M22.6961231,9.07844923 C24.2004221,9.07844923 25.4196578,10.297685 25.4196578,11.801984 C25.4196578,13.306283 24.2004221,14.5255188 22.6961231,14.5255188 C21.191824,14.5255188 19.9725883,13.306283 19.9725883,11.801984 C19.9725883,10.297685 21.191824,9.07844923 22.6961231,9.07844923 L22.6961231,9.07844923 Z M22.6961231,21.7882781 C21.0892376,21.7882781 19.6866171,22.6280347 18.879543,23.8872156 L14.0180334,21.1092101 C14.3321478,20.4918756 14.5255188,19.8037291 14.5255188,19.0647434 C14.5255188,18.6080974 14.4374578,18.1759632 14.3121752,17.7601702 L19.3697793,14.8704998 C20.1986417,15.7692663 21.3770244,16.3412086 22.6961231,16.3412086 C25.2035907,16.3412086 27.2353477,14.3094517 27.2353477,11.801984 C27.2353477,9.29451632 25.2035907,7.26275938 22.6961231,7.26275938 C20.1886554,7.26275938 18.1568985,9.29451632 18.1568985,11.801984 C18.1568985,12.25863 18.2449594,12.6907642 18.370242,13.107465 L13.3126379,15.9962275 C12.4837755,15.0983689 11.3053928,14.5255188 9.98629415,14.5255188 C7.47882647,14.5255188 5.44706954,16.5572757 5.44706954,19.0647434 C5.44706954,21.5722111 7.47882647,23.603968 9.98629415,23.603968 C11.0212374,23.603968 11.9644882,23.2444614 12.7279858,22.661625 L12.7098289,22.6961231 L18.2068299,25.8372665 C18.188673,26.0006786 18.1568985,26.1586436 18.1568985,26.3275028 C18.1568985,28.8349704 20.1886554,30.8667274 22.6961231,30.8667274 C25.2035907,30.8667274 27.2353477,28.8349704 27.2353477,26.3275028 C27.2353477,23.8200351 25.2035907,21.7882781 22.6961231,21.7882781 L22.6961231,21.7882781 Z M18.5,34.6875 C9.559875,34.6875 2.3125,27.4378125 2.3125,18.5 C2.3125,9.5621875 9.559875,2.3125 18.5,2.3125 C27.440125,2.3125 34.6875,9.5621875 34.6875,18.5 C34.6875,27.4378125 27.440125,34.6875 18.5,34.6875 L18.5,34.6875 Z M18.5,0 C8.283375,0 0,8.27875 0,18.5 C0,28.72125 8.283375,37 18.5,37 C28.716625,37 37,28.72125 37,18.5 C37,8.27875 28.716625,0 18.5,0 L18.5,0 Z" fill="#4A4A4A"></path>
      </g>
    )
  }
  
}