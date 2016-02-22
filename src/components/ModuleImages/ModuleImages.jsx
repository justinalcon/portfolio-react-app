import React from 'react';

// Utils
import {ENDPOINT_URL} from '../../js/utils';

// Modules
import ImgSingleFull from '../ImgSingleFull/ImgSingleFull';
import ImgListVertical from '../ImgListVertical/ImgListVertical';

export default class ModuleImages extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    
    // This nested-ness basically requires image_gallery[0].location.url
    image_gallery: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          location: React.PropTypes.shape({
            url: React.PropTypes.string.isRequired
          })
        })
      ).isRequired
  };

  render() {

    let render_component;
    if(this.props.image_gallery.length == 1){
      // create a single img
      render_component = <ImgSingleFull img_url={ENDPOINT_URL+this.props.image_gallery[0].location.url}/>
    } else {
      // iterate over and create an array of imgs
      let img_components = this.props.image_gallery.map(function(img_obj){
        return <ImgSingleFull key={img_obj.id} img_url={ENDPOINT_URL+img_obj.location.url}/>
      });
      // pass those ararys into a vertical list parent module
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