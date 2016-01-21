exports.getAllPosts = function(){
    return [
        {
            id: 1,
            title: "1st spark",
            summary: "This is my summary",
            dev_notes: "My dev notes ",
            direct_link: "http://direct-link.com",
            article_text: "This is long form article text.",
            image_gallery: ["https://d13yacurqjgara.cloudfront.net/users/107759/screenshots/2470548/dribbble.png"],
            canned_video: "Canned Video",
            created_at: "2015-12-28T20:51:21.000Z",
            updated_at: "2015-12-28T20:51:21.000Z",
            user_id: null,
            published: null,
            tags: ["tag 1", "tag 2", "tag 3"]
            }, {
            id: 2,
            title: "Spark number 2",
            summary: "this is spark number 2",
            dev_notes: "these are my dev notes for spark 2",
            direct_link: "http://direct-link.com/spark2",
            article_text: "This is long form article text.",
            image_gallery: ["https://d13yacurqjgara.cloudfront.net/users/107759/screenshots/2470548/dribbble.png"],
            canned_video: "This is a canned video",
            created_at: "2016-01-06T20:49:22.000Z",
            updated_at: "2016-01-06T20:49:22.000Z",
            user_id: null,
            published: true,
            tags: ["tag 1", "tag 2", "tag 3"]
        }
    ]; 
}

exports.getPostSingle = function(id){
    return {
        id: 1,
        title: `Spark defined server-side. id:${id}`,
        summary: "This is my summary",
        dev_notes: "My dev notes ",
        direct_link: "http://direct-link.com",
        article_text: "This is long form article text.",
        image_gallery: ["https://d13yacurqjgara.cloudfront.net/users/107759/screenshots/2470548/dribbble.png"],
        canned_video: "Canned Video",
        created_at: "2015-12-28T20:51:21.000Z",
        updated_at: "2015-12-28T20:51:21.000Z",
        user_id: null,
        published: null,
        tags: ["tag 1", "tag 2", "tag 3"]
    }
}
