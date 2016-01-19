import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import PostsStore from '../../js/stores/PostsStore';

import TabBar from '../TabBar/TabBar';
import FeaturedCarousel from '../FeaturedCarousel/FeaturedCarousel';
import TestModule from '../Tests/TestModule';

class SparkDetailView extends React.Component {
  constructor() {
    super();
  }

  static getStores(props) {
    return [PostsStore]
  };
  static getPropsFromStores(props) {
    return PostsStore.getState()
  };

  static propTypes = {
    selected_post: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired
    })
  };

  state = {
    tab_index: 0
  };

  setTabState = (index) => {
    this.setState({
      tab_index: index
    });
  };

  render() {

    let post = this.props.selected_post;
    let slides = [];
    let tab_names = [];

    if(post.direct_link !== null){
      slides.push(<TestModule key={"link"+post.id}/>);
      tab_names.push("Link");
    }
    if(post.dev_notes !== null){
      slides.push(<TestModule key={"notes"+post.id}/>);
      tab_names.push("Dev Notes");
    }
    if(post.image_gallery !== null){
      slides.push(<TestModule key={"imgs"+post.id}/>);
      tab_names.push("Images"); 
    }

    return (
      <div>
        SparkDetailView - {this.props.selected_post.title} - tab_index:{this.state.tab_index}

        <TabBar tab_index={this.state.tab_index} tab_names={tab_names} cbSetTabState={this.setTabState}/>

        <FeaturedCarousel tab_index={this.state.tab_index}>
          {slides}
        </FeaturedCarousel>
      </div>
    )
  }

}

export default SparkDetailView = connectToStores(SparkDetailView);