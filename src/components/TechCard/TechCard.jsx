import React from 'react';
import {Link} from 'react-router';
import {ENDPOINT_URL, detectIsTouch} from '../../js/utils';

// Stores
import TechnologiesActions from '../../js/actions/TechnologiesActions';

// Model Spec
import {PropConfirm} from '../../js/specs';

// Menu
import BtnChipArticle from '../Buttons/Chips/BtnChipArticle';
import BtnChipDevNotes from '../Buttons/Chips/BtnChipDevNotes';
import BtnChipLink from '../Buttons/Chips/BtnChipLink';
import BtnChipImage from '../Buttons/Chips/BtnChipImage';
import BtnChipVideo from '../Buttons/Chips/BtnChipVideo';

export default class TechCard extends React.Component {
  constructor() {
    super();
    this.hammertime = false;
    this.menu_btns = [];
  }
  state = {
    toggled : false,
    img_loaded: false
  };
  static propTypes = {
    tech_data : React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired
    })
  };

  componentDidMount() {
    this.loadBackgroundImage();
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

  loadBackgroundImage(){
    if(this.props.tech_data.images.length == 0){
      return false
    } else {
      function imgLoadSuccess(){
        console.log("imgLoadSuccess");
      }
      var img = new Image();
      img.onload = function(){
        this.setState({img_loaded: true})
      }.bind(this);
      img.src = ENDPOINT_URL + this.props.tech_data.images[0].location.url;
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

  selectPost = () => {
    TechnologiesActions.holdScrollForSelectedTechnology();
    TechnologiesActions.updateSelectedTechnology(this.props.tech_data);
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
    let card_class = "card";
    if(this.state.toggled){
      card_class += " card--toggled"
    }

    // BG and opacity state of bg image
    if(PropConfirm(this.props.tech_data, "images")){
      var tech_bg_styles = {
        backgroundImage: `url(${ENDPOINT_URL+this.props.tech_data.images[0].location.url})`,
        opacity: this.state.img_loaded ? 1 : 0
      }
    }

    // Convert date to legible string
    let d = new Date(this.props.tech_data.updated_at);
    let date = (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear();

    return (
      <div className={card_class} ref="card" onMouseOver={this.handleMouseOn} onMouseOut={this.handleMouseOff}>
        <div className="card__bg" style={tech_bg_styles} />
        <div className="card__shadows" />
        <Link className="card__link" to={`/tech/${this.props.tech_data.id}`} onClick={this.selectPost} draggable="false">
          <p className="card__title">{this.props.tech_data.name}</p>
        </Link>
        <div className="card__detail">
          <p className="card__summary">{this.props.tech_data.name}</p>
          <div className="card__menu-btns">{this.menu_btns}</div>
        </div>
      </div>
    )
  }

}
