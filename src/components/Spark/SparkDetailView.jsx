import React from 'react';

import PostsStore from '../../js/stores/PostsStore';

export default class SparkDetailView extends React.Component {
  constructor() {
    super();
  }

  state = {
    spark_data: PostsStore.getState().selected_post
  };

  componentDidMount = () => {
    PostsStore.listen(this.onChange);
  };

  componentWillUnmount = () => {
    PostsStore.unlisten(this.onChange);
  };

  onChange = (state) => {
    this.setState({spark_data : state.spark_data});
  };


  render() {
    console.log("detail view", this.state.spark_data)
    return (
      <div>
        SparkDetailView - {this.state.spark_data.title}
      </div>
    )
  }

}