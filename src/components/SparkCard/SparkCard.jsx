import React from 'react';
import {Link} from 'react-router';
import {ENDPOINT_URL, detectIsTouch} from '../../js/utils';

// Stores
import PostsActions from '../../js/actions/PostsActions';

// Model Spec
import {SparkPropConfirm} from '../../js/specs';

// Menu
import BtnChipArticle from '../Buttons/Chips/BtnChipArticle';
import BtnChipDevNotes from '../Buttons/Chips/BtnChipDevNotes';
import BtnChipLink from '../Buttons/Chips/BtnChipLink';
import BtnChipImage from '../Buttons/Chips/BtnChipImage';
import BtnChipVideo from '../Buttons/Chips/BtnChipVideo';

export default class SparkCard extends React.Component {
  constructor() {
    super();
    this.hammertime = false;
    this.menu_btns = [];
  }
  state = {
    toggled : false
  };
  static propTypes = {
    spark_data : React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string.isRequired
    })
  };

  componentDidMount() {
    this.generateDetailIcons();

    if(detectIsTouch()){
      this.addHammerHandlers();
    }
  }

  componentWillUnmount() {
    if(detectIsTouch()){
      this.hammertime.off('swipe');
      this.hammertime.destroy();
    }
  }

  addHammerHandlers() {
    let toggle = this.toggleState;
    let card = this.refs.card;

    this.hammertime = new Hammer.Manager(card, {
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL}]
      ]
    }).on('swipe', function(ev){
      toggle();
    });
  }

  generateDetailIcons() {
    if(SparkPropConfirm(this.props.spark_data, "longform")){
      this.menu_btns.push(
        <Link to={`/spark/${this.props.spark_data.id}?slide=article`} key={"article-btn"+this.props.spark_data.id} onClick={this.selectPost}>
          <BtnChipArticle add_class="btn-chip--white-out btn-chip--med" />
        </Link>
      );
    }
    if(SparkPropConfirm(this.props.spark_data, "dev_notes")){
      this.menu_btns.push(
        <Link to={`/spark/${this.props.spark_data.id}?slide=dev-notes`} key={"dev-btn"+this.props.spark_data.id} onClick={this.selectPost}>
          <BtnChipDevNotes add_class="btn-chip--white-out btn-chip--med" />
        </Link>
      );
    }
    if(SparkPropConfirm(this.props.spark_data, "direct_link")){
      this.menu_btns.push(
        <Link to={`/spark/${this.props.spark_data.id}?slide=link`} key={"link-btn"+this.props.spark_data.id} onClick={this.selectPost}>
          <BtnChipLink add_class="btn-chip--white-out btn-chip--med" />
        </Link>
      );
    }
    if(SparkPropConfirm(this.props.spark_data, "images")){
      this.menu_btns.push(
        <Link to={`/spark/${this.props.spark_data.id}?slide=images`} key={"imgs-btn"+this.props.spark_data.id} onClick={this.selectPost}>
          <BtnChipImage add_class="btn-chip--white-out btn-chip--med" />
        </Link>
      );
    }
    if(SparkPropConfirm(this.props.spark_data, "video")){
      this.menu_btns.push(
        <Link to={`/spark/${this.props.spark_data.id}?slide=video`} key={"video-btn"+this.props.spark_data.id} onClick={this.selectPost}>
          <BtnChipVideo add_class="btn-chip--white-out btn-chip--med" />
        </Link>
      );
    }
  }

  selectPost = () => {
    PostsActions.holdScrollForSelectedPost();
    PostsActions.updateSelectedPost(this.props.spark_data);
  };

  toggleState = () => {
    this.setState({ toggled: !this.state.toggled })
  };

  handleMouseOn = () => {
    this.setState({ toggled: true })
  };

  handleMouseOff = () => {
    this.setState({ toggled: false })
  }; 

  render() {

    // Check state and apply toggle class
    let card_class = "spark-card";
    if(this.state.toggled){
      card_class += " spark-card--toggled"
    }

    // Apply the background image as inline style
    let card_css = {}
    if(SparkPropConfirm(this.props.spark_data, "images")){
      card_css.backgroundImage = `url(${ENDPOINT_URL+this.props.spark_data.images[0].location.url})`
    }

    // Convert date to legible string
    let d = new Date(this.props.spark_data.updated_at);
    let date = (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear();

    // Convert tags to names
    let tags_names = this.props.spark_data.tags.map(function(obj){
      return obj.tag + " ";
    });

    return (
      <div className={card_class} ref="card" style={card_css} onMouseOver={this.handleMouseOn} onMouseOut={this.handleMouseOff}>
        <div className="spark-card__shadows" />
        <Link className="spark-card__link" to={`/spark/${this.props.spark_data.id}`} onClick={this.selectPost} draggable="false">
          <p className="spark-card__title">{this.props.spark_data.title}</p>
          <p className="spark-card__tags">{tags_names}</p>
          <div className="spark-card__dots">
            <div className="spark-card__dot"/>
            <div className="spark-card__dot"/>
          </div>
        </Link>
        <div className="spark-card__detail">
          <p className="spark-card__summary">{this.props.spark_data.summary}</p>
          <div className="spark-card__menu-btns">{this.menu_btns}</div>
        </div>
        <div className="spark-card__bottom-info">
          <div className="spark-card__author"><strong>By&nbsp;</strong>Foobar</div>
          <div className="spark-card__date">{date}</div>
        </div>
      </div>
    )
  }

}