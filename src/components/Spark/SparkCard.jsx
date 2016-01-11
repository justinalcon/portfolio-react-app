import React from 'react';
import {Link} from 'react-router';
import PostsActions from '../../js/actions/PostsActions';

export default class SparkCard extends React.Component {
  constructor() {
    super();
  }
  static propTypes = {
    spark_data : React.PropTypes.shape({
      id: React.PropTypes.number.isRequired
    })
  };

  componentDidMount() {
    this.addHammerHandlers();
  }

  componentWillUnmount() {
    console.log("TODO: garbage collect hammer handlers");
  }

  selectPost = () => {
    PostsActions.updateSelectedPost(this.props.spark_data);
  };

  addHammerHandlers() {
    let card = this.refs.card;
    let hammertime = new Hammer(card);
    hammertime.on('swipe', function(ev){
      console.log("swipe recognized", card);
      $(card).toggleClass("spark-card--swiped");
    });
  }

  render() {
    return (
      <div className="spark-card" ref="card">
        <h2>
          <Link to={`/spark/${this.props.spark_data.id}`} onClick={this.selectPost}>
            {this.props.spark_data.title}
          </Link>
        </h2>
        <h3>Spark Card</h3>
        <button onClick={this.selectPost}>Select Me</button>
      </div>
    )
  }

}