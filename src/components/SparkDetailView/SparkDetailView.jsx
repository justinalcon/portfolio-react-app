import React from 'react';

import connectToStores from 'alt-utils/lib/connectToStores';
import TechnologiesStore from '../../js/stores/TechnologiesStore';
import HeaderActions from '../../js/actions/HeaderActions';
import {slugify} from '../../js/utils';

// Model Spec
import {PropConfirm} from '../../js/specs';

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

  }

  // Connects TechnologiesStore.state into this.props. Using connectToStores alt util.
  static getStores(props) {
    return [TechnologiesStore]
  };
  static getPropsFromStores(props) {
    return TechnologiesStore.getState()
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
    if(PropConfirm(selected_post, "longform")){
      this.slides.push(<ModuleArticle key={"article"+selected_post.id} article_text={selected_post.longform} />);
      this.tab_names.push("Article");
      this.menu_btns.push(<BtnChipArticle key={"article-btn"+selected_post.id} add_class="btn-chip--med" cbClick={this.setTabState.bind(this, this.menu_btns.length)} />)
    }
    if(PropConfirm(selected_post, "dev_notes")){
      this.slides.push(<ModuleDevNotes key={"notes"+selected_post.id} dev_notes={selected_post.dev_notes} />);
      this.tab_names.push("Dev Notes");
      this.menu_btns.push(<BtnChipDevNotes key={"dev-btn"+selected_post.id} add_class="btn-chip--med" cbClick={this.setTabState.bind(this, this.menu_btns.length)} />)
    }
    if(PropConfirm(selected_post, "direct_link")){
      this.slides.push(<ModuleLink key={"link"+selected_post.id} direct_link={selected_post.direct_link} />);
      this.tab_names.push("Link");
      this.menu_btns.push(<BtnChipLink key={"link-btn"+selected_post.id} add_class="btn-chip--med" cbClick={this.setTabState.bind(this, this.menu_btns.length)} />)
    }
    if(PropConfirm(selected_post, "images")){
      this.slides.push(<ModuleImages key={"imgs"+selected_post.id} image_gallery={selected_post.images}/>);
      this.tab_names.push("Images");
      this.menu_btns.push(<BtnChipImage key={"imgs-btn"+selected_post.id} add_class="btn-chip--med" cbClick={this.setTabState.bind(this, this.menu_btns.length)} />)
    }
    if(PropConfirm(selected_post, "video")){
      this.slides.push(<ModuleVideo key={"video"+selected_post.id} canned_video={selected_post.canned_video.url} />);
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

        details
      </div>
    )
  }

}

export default SparkDetailView = connectToStores(SparkDetailView);
