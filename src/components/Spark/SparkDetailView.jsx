import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import PostsStore from '../../js/stores/PostsStore';

import TabBar from '../TabBar/TabBar';
import FeaturedCarousel from '../FeaturedCarousel/FeaturedCarousel';
import TestModule from '../Tests/TestModule';

class SparkDetailView extends React.Component {
  constructor(props) {
    super(props);

    // Procedurally generate all content based on data in selected_post
    this.slides = [];
    this.tab_names = [];
    this.generateDetailContent(props.selected_post);

    // Check for and validate optional :carousel_index param. If valid, set as default state.
    let initial_tab_index = 0;
    if(props.params.carousel_index !== undefined && parseInt(props.params.carousel_index) < this.slides.length){
      initial_tab_index = parseInt(props.params.carousel_index);
    }

    this.state = {
      tab_index: initial_tab_index
    }
  }

  // Connects PostsStore.state into this.props. Using connectToStores alt util.
  static getStores(props) {
    return [PostsStore]
  };
  static getPropsFromStores(props) {
    return PostsStore.getState()
  };

  // Validate props
  static propTypes = {
    selected_post: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired
    })
  };

  setTabState = (index) => {
    this.setState({
      tab_index: index
    });
  };

  generateDetailContent(selected_post) {
    
    if(selected_post.direct_link !== null){
      this.slides.push(<TestModule key={"link"+selected_post.id} test={selected_post.title} />);
      this.tab_names.push("Link");
    }
    if(selected_post.dev_notes !== null){
      this.slides.push(<TestModule key={"notes"+selected_post.id} test={selected_post.title} />);
      this.tab_names.push("Dev Notes");
    }
    if(selected_post.image_gallery !== null){
      this.slides.push(<TestModule key={"imgs"+selected_post.id} test={selected_post.title} />);
      this.tab_names.push("Images"); 
    }

  };

  render() {

    return (
      <div>
        {/*SparkDetailView - {this.props.selected_post.title} - tab_index:{this.state.tab_index}*/}

        <div className="spark-details__tabs">
          <TabBar tab_index={this.state.tab_index} tab_names={this.tab_names} cbSetTabState={this.setTabState}/>
        </div>

        <div className="spark-details__carousel">
          <FeaturedCarousel tab_index={this.state.tab_index}>
            {this.slides}
          </FeaturedCarousel>
        </div>

      </div>
    )
  }

}

export default SparkDetailView = connectToStores(SparkDetailView);