import React from 'react';


export default class ImgSingleFull extends React.Component {
  constructor() {
    super();
  }

  state = {
    is_zoomed: false,
    img_loaded: false,
    img_width: 0,
    img_height: 0,
    img_scale: 1,
  };

  static propTypes = {
    img_url: React.PropTypes.string.isRequired
  };

  componentDidMount() {
    this.loadImage();
  }

  loadImage() {
    let loadImageSuccess = this.loadImageSuccess;
    let img = new Image();
    img.onload = function(){
      // console.log('My width is: ', this.naturalWidth);
      // console.log('My height is: ', this.naturalHeight);
      loadImageSuccess(this.naturalWidth, this.naturalHeight);
    };
    img.src = this.props.img_url;
  }

  loadImageSuccess = (width, height) => {
    // console.log("loadImageSuccess => ()", width, height);
    this.setState({
      img_loaded: true,
      img_width: width,
      img_height: height
    });
  };

  toggleZoom = () => {

    if(this.state.is_zoomed){
      this.setState({
        img_scale: 1,
        is_zoomed: false
      });
    } else {
      let window_w = window.innerWidth;
      let window_h = window.innerHeight;
      let scale = 1;

      if(window_w / this.state.img_width > window_h / this.state.img_height){
        scale = this.state.img_height / window_h;
      } else {
        scale = this.state.img_width / window_w;
      }  
      this.setState({
        img_scale: scale,
        is_zoomed: true
      });
    }

  };

  render() {

    let img = "";
    if(this.state.img_loaded){
      let img_style = {
        backgroundImage: `url(${this.props.img_url})`,
        width: this.state.img_width+'px',
        height: this.state.img_height+'px',
        transform: `scale(${this.state.img_scale})`
      };
      img = <div className="img-single-full__img" style={img_style} onClick={this.toggleZoom}/>
    }

    return (
      <div className="img-single-full">
        {img}
      </div>
    )
  }

}