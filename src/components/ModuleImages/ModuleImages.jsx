import React from 'react';
import ImgSingleFull from '../ImgSingleFull/ImgSingleFull';
import ImgListVertical from '../ImgListVertical/ImgListVertical';

export default class ModuleImages extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    image_gallery: React.PropTypes.array.isRequired
  };

  render() {

    let render_component;
    if(this.props.image_gallery.length == 1){
      render_component = <ImgSingleFull img_url={this.props.image_gallery[0]}/>
    } else {
      let img_components = this.props.image_gallery.map(function(img_url){
        return <ImgSingleFull key={img_url} img_url={img_url}/>
      });
      render_component = (
        <ImgListVertical>
          {img_components}
        </ImgListVertical>
      );
    }

    return (
      <div className="module-images">
        {render_component}
      </div>
    )
  }

}