import React from 'react';
import {Link} from 'react-router';
import PostsActions from '../../js/actions/PostsActions';

export default class SparkCard extends React.Component {
  constructor() {
    super();
    this.hammertime;
  }
  state = {
    toggled : false
  };
  static propTypes = {
    spark_data : React.PropTypes.shape({
      id: React.PropTypes.number.isRequired
    })
  };

  componentDidMount() {
    this.addHammerHandlers();
  }

  componentWillUnmount() {
    this.hammertime.off('swipe');
    this.hammertime.destroy();
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
    PostsActions.updateSelectedPost(this.props.spark_data);
  };

  toggleState = () => {
    this.setState({ toggled: !this.state.toggled })
  };

  render() {

    let className = "spark-card";
    if(this.state.toggled){
      className += " spark-card--toggled"
    }

    return (
      <div className={className} ref="card">
        <h2>
          <Link to={`/spark/${this.props.spark_data.id}`} onClick={this.selectPost}>
            {this.props.spark_data.title}
          </Link>
        </h2>
        <h3>Spark Card</h3>
      </div>
    )
  }

}