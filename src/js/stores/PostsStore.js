import alt from '../alt';
import PostsActions from '../actions/PostsActions';

class PostsStore {
  constructor() {
    this.current_posts = [{
        id: 1,
        title: "1st spark",
        summary: "This is my summary",
        dev_notes: "My dev notes ",
        direct_link: "http://direct-link.com",
        iFramed_view: "I am a iframe",
        image_gallery: "Image Gallery",
        canned_video: "Canned Video",
        created_at: "2015-12-28T20:51:21.000Z",
        updated_at: "2015-12-28T20:51:21.000Z",
        user_id: null,
        published: null
    }, {
        id: 2,
        title: "Spark number 2",
        summary: "this is spark number 2",
        dev_notes: "these are my dev notes for spark 2",
        direct_link: "http://direct-link.com/spark2",
        iFramed_view: "My iframed view",
        image_gallery: "http://www.image1.com/image1.jpg,http://www.image1.com/image2.jpg,http://www.image1.com/image3.jpg,http://www.image1.com/image4.jpg,http://www.image1.com/image5.jpg",
        canned_video: "This is a canned video",
        created_at: "2016-01-06T20:49:22.000Z",
        updated_at: "2016-01-06T20:49:22.000Z",
        user_id: null,
        published: true
    }];

    this.selected_post = {
        id: -1,
        title: "undefined",
    };


    this.bindListeners({
      handleUpdateSelectedPost : PostsActions.UPDATE_SELECTED_POST
    });

  }

  handleUpdateSelectedPost(post) {
    this.selected_post = post;
  }

}

module.exports = alt.createStore(PostsStore, 'PostsStore');