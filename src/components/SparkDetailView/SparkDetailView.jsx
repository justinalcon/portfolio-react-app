import React from 'react';

import connectToStores from 'alt-utils/lib/connectToStores';
import PostsStore from '../../js/stores/PostsStore';
import HeaderActions from '../../js/actions/HeaderActions';
import {slugify} from '../../js/utils';

// UI Component
import TabBar from '../TabBar/TabBar';
import FeaturedCarousel from '../FeaturedCarousel/FeaturedCarousel';

// Modules
import TestModule from '../Tests/TestModule';
import ModuleArticle from '../ModuleArticle/ModuleArticle';
import ModuleDevNotes from '../ModuleDevNotes/ModuleDevNotes';
import ModuleLink from '../ModuleLink/ModuleLink';
import ModuleImages from '../ModuleImages/ModuleImages';
import ModuleVideo from '../ModuleVideo/ModuleVideo';

// Menu
import FloatingMenu from '../FloatingMenu/FloatingMenu';
// import BtnChipShare from '../Buttons/Chips/BtnChipShare';
// import BtnChipFavorite from '../Buttons/Chips/BtnChipFavorite';
import BtnChipArticle from '../Buttons/Chips/BtnChipArticle';
import BtnChipDevNotes from '../Buttons/Chips/BtnChipDevNotes';
import BtnChipLink from '../Buttons/Chips/BtnChipLink';
import BtnChipImage from '../Buttons/Chips/BtnChipImage';
import BtnChipVideo from '../Buttons/Chips/BtnChipVideo';

class SparkDetailView extends React.Component {
  constructor(props) {
    super(props);

    // Procedurally generate all content based on data in selected_post
    this.slides = [];
    this.tab_names = [];
    this.menu_btns = [];
    this.generateDetailContent(props.selected_post);

    // Check for query string. If found, set initial state.
    let initial_tab_index = 0;
    if(props.location.query.slide !== undefined){
      for (var i = 0; i < this.tab_names.length; i++) {
        if(props.location.query.slide === slugify(this.tab_names[i])){
          initial_tab_index = i;
          break;
        }
      };
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

  // On mount, update the Header to have our title
  componentDidMount() {
    HeaderActions.updateHeaderTitle(this.props.selected_post.title);
  }

  generateDetailContent(selected_post) {
    if(typeof selected_post.longform !== "undefined"){
      this.slides.push(<ModuleArticle key={"article"+selected_post.id} article_text={this.props.selected_post.longform} />);
      this.tab_names.push("Article");
      this.menu_btns.push(<BtnChipArticle key={"article-btn"+selected_post.id} add_class="btn-chip--med" cbClick={this.setTabState.bind(this, this.menu_btns.length)} />)
    }
    if(typeof selected_post.dev_notes !== "undefined"){
      this.slides.push(<ModuleDevNotes key={"notes"+selected_post.id} dev_notes={this.props.selected_post.dev_notes} />);
      this.tab_names.push("Dev Notes");
      this.menu_btns.push(<BtnChipDevNotes key={"dev-btn"+selected_post.id} add_class="btn-chip--med" cbClick={this.setTabState.bind(this, this.menu_btns.length)} />)
    }
    if(typeof selected_post.direct_link !== "undefined"){
      this.slides.push(<ModuleLink key={"link"+selected_post.id} direct_link={this.props.selected_post.direct_link} />);
      this.tab_names.push("Link");
      this.menu_btns.push(<BtnChipLink key={"link-btn"+selected_post.id} add_class="btn-chip--med" cbClick={this.setTabState.bind(this, this.menu_btns.length)} />)
    }
    if(typeof selected_post.image_gallery !== "undefined"){
      this.slides.push(<ModuleImages key={"imgs"+selected_post.id} image_gallery={this.props.selected_post.image_gallery}/>);
      this.tab_names.push("Images"); 
      this.menu_btns.push(<BtnChipImage key={"imgs-btn"+selected_post.id} add_class="btn-chip--med" cbClick={this.setTabState.bind(this, this.menu_btns.length)} />)
    }
    if(typeof selected_post.canned_video !== "undefined"){
      this.slides.push(<ModuleVideo key={"video"+selected_post.id} canned_video={this.props.selected_post.canned_video} />);
      this.tab_names.push("Video"); 
      this.menu_btns.push(<BtnChipVideo key={"video-btn"+selected_post.id} add_class="btn-chip--med" cbClick={this.setTabState.bind(this, this.menu_btns.length)} />)
    }
  }

  setTabState = (index) => {
    
    if(index >= 0 && index < this.slides.length){
      // update internal state
      this.setState({
        tab_index: index
      });

      // update url to match
      this.setQueryString(index);
    }
  };

  setQueryString = (index) => {
    this.props.history.pushState(null, this.props.location.pathname, { slide: slugify(this.tab_names[index]) } );  
  };

  render() {

    return (
      <div className="spark-details css-js--fade-in">

        <div className="spark-details__tabs">
          <TabBar tab_names={this.tab_names} tab_index={this.state.tab_index} cbSetTabState={this.setTabState}/>
        </div>

        <div className="spark-details__carousel">
          <FeaturedCarousel tab_index={this.state.tab_index} cbSetTabState={this.setTabState}>
            {this.slides}
          </FeaturedCarousel>
        </div>

        <FloatingMenu>
          {/*<BtnChipShare add_class="btn-chip--med" />
          <BtnChipFavorite add_class="btn-chip--med" />
          <hr />*/}
          {this.menu_btns}          
        </FloatingMenu>

      </div>
    )
  }

}

export default SparkDetailView = connectToStores(SparkDetailView);