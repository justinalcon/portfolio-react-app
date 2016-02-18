import alt from '../alt';
import PostsActions from '../actions/PostsActions';
import QueryActions from '../actions/QueryActions';

class PostsStore {
  constructor() {

    // All of the posts in view
    this.current_posts = [];

    // Boolean state value to show if loading or not.
    this.is_loading_more_posts = false;

    // A single selected post
    this.selected_post = {};

    // An array of all tags
    this.tags_all = [];

    // Catch actions, and run functions to update store
    this.bindListeners({
      handleUpdateSelectedPost: PostsActions.updateSelectedPost,
      handleLoadMorePosts: PostsActions.loadMorePosts,
      handleLoadMorePostsSuccess: PostsActions.loadMorePostsSuccess,
      handleLoadMorePostsFail: PostsActions.loadMorePostsFail,
      handleQuerySearch: QueryActions.querySearch,
      handleQueryByTags: QueryActions.queryByTags
    });

  }

  // Assign the selected post as the passed in post
  handleUpdateSelectedPost(post) {
    this.selected_post = post;
  }

  handleLoadMorePosts(){
    this.setState({
      is_loading_more_posts: true
    })
    // console.log("handleLoadMorePosts");
  }
  handleLoadMorePostsSuccess(posts){
    // console.log("handleLoadMorePostsSuccess");
    let appended_posts = this.current_posts;
    posts.data.forEach(function(post){
      
      /* TEMP WORKAROUND TO TEST PULLING IN MORE DATA */
      post.id = Math.floor(Math.random()*100);
      /* ---------------- */

      appended_posts.push(post);
    });

    // Update state and emit change
    this.setState({
      current_posts: appended_posts,
      is_loading_more_posts: false
    });
  }
  handleLoadMorePostsFail(err_msg){
    this.setState({
      is_loading_more_posts: false
    });
    console.error(err_msg.status, err_msg.statusText);
  }

  //
  handleQuerySearch(search_term) {
    console.log(`TODO: submit search for "${search_term}"`);
  }

  //
  handleQueryByTags(tags_array) {
   console.log("TODO: submit query with tags",tags_array); 
  }

}

module.exports = alt.createStore(PostsStore, 'PostsStore');