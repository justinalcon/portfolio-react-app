import React from 'react';
import {Link} from 'react-router';
import {detectIsTouch} from '../../js/utils';

// Stores
import PostsActions from '../../js/actions/PostsActions';

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
      title: React.PropTypes.string.isRequired,
      image_gallery: React.PropTypes.arrayOf(React.PropTypes.string)
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
    if(this.props.spark_data.article_text !== null){
      this.menu_btns.push(
        <Link to={`/spark/${this.props.spark_data.id}?slide=article`} key={"article-btn"+this.props.spark_data.id} onClick={this.selectPost}>
          <BtnChipArticle add_class="btn-chip--white-out btn-chip--med" />
        </Link>
      );
    }
    if(this.props.spark_data.dev_notes !== null){
      this.menu_btns.push(
        <Link to={`/spark/${this.props.spark_data.id}?slide=dev-notes`} key={"dev-btn"+this.props.spark_data.id} onClick={this.selectPost}>
          <BtnChipDevNotes add_class="btn-chip--white-out btn-chip--med" />
        </Link>
      )
    }
    if(this.props.spark_data.direct_link !== null){
      this.menu_btns.push(
        <Link to={`/spark/${this.props.spark_data.id}?slide=link`} key={"link-btn"+this.props.spark_data.id} onClick={this.selectPost}>
          <BtnChipLink add_class="btn-chip--white-out btn-chip--med" />
        </Link>
      )
    }
    if(this.props.spark_data.image_gallery !== null){
      this.menu_btns.push(
        <Link to={`/spark/${this.props.spark_data.id}?slide=images`} key={"imgs-btn"+this.props.spark_data.id} onClick={this.selectPost}>
          <BtnChipImage add_class="btn-chip--white-out btn-chip--med" />
        </Link>
      )
    }
    if(this.props.spark_data.canned_video !== null){
      this.menu_btns.push(
        <Link to={`/spark/${this.props.spark_data.id}?slide=video`} key={"video-btn"+this.props.spark_data.id} onClick={this.selectPost}>
          <BtnChipVideo add_class="btn-chip--white-out btn-chip--med" />
        </Link>
      )
    }
  }

  selectPost = () => {
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

    let card_class = "spark-card";
    if(this.state.toggled){
      card_class += " spark-card--toggled"
    }

    let card_css = {
      backgroundImage: `url(${this.props.spark_data.image_gallery[0]})`
    }

    let d = new Date(this.props.spark_data.updated_at);
    let date = (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear();

    return (
      <div className={card_class} ref="card" style={card_css} onMouseOver={this.handleMouseOn} onMouseOut={this.handleMouseOff}>
        <div className="spark-card__shadows" />
        <Link className="spark-card__link" to={`/spark/${this.props.spark_data.id}`} onClick={this.selectPost} draggable="false">
          <p className="spark-card__title">{this.props.spark_data.title}</p>
          <p className="spark-card__tags">{this.props.spark_data.tags}</p>
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