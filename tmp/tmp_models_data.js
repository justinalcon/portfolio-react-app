exports.getAllPosts = function(){
    return [
        {
            id: 1,
            title: "Spark #1",
            summary: "This is spark #1 isn't that dandy",
            dev_notes: "My dev notes ",
            direct_link: "http://direct-link.com",
            article_text: "This is long form article text.",
            image_gallery: ["http://lorempixel.com/640/400/technics/1"],
            canned_video: "Canned Video",
            created_at: "2015-12-28T20:51:21.000Z",
            updated_at: "2015-12-28T20:51:21.000Z",
            user_id: null,
            published: null,
            tags: ["tag 1", "tag 2", "tag 3"]
        },
        {
            id: 2,
            title: "Spark #2",
            summary: "This is spark #2 isn't that dandy",
            dev_notes: "these are my dev notes for spark 2",
            direct_link: "http://direct-link.com/spark2",
            article_text: "This is long form article text.",
            image_gallery: ["http://lorempixel.com/640/400/technics/2"],
            canned_video: "This is a canned video",
            created_at: "2016-01-06T20:49:22.000Z",
            updated_at: "2016-01-06T20:49:22.000Z",
            user_id: null,
            published: true,
            tags: ["tag 1", "tag 2", "tag 3"]
        },
        {
            id: 3,
            title: "Spark #3",
            summary: "This is spark #3 isn't that dandy",
            dev_notes: "these are my dev notes for spark 2",
            direct_link: "http://direct-link.com/spark2",
            article_text: "This is long form article text.",
            image_gallery: ["http://lorempixel.com/640/400/technics/3"],
            canned_video: "This is a canned video",
            created_at: "2016-01-06T20:49:22.000Z",
            updated_at: "2016-01-06T20:49:22.000Z",
            user_id: null,
            published: true,
            tags: ["tag 1", "tag 2", "tag 3"]
        },
        {
            id: 4,
            title: "Spark #4",
            summary: "This is spark #4 isn't that dandy",
            dev_notes: "these are my dev notes for spark 2",
            direct_link: "http://direct-link.com/spark2",
            article_text: "This is long form article text.",
            image_gallery: ["http://lorempixel.com/640/400/technics/4"],
            canned_video: "This is a canned video",
            created_at: "2016-01-06T20:49:22.000Z",
            updated_at: "2016-01-06T20:49:22.000Z",
            user_id: null,
            published: true,
            tags: ["tag 1", "tag 2", "tag 3"]
        },
        {
            id: 5,
            title: "Spark #5",
            summary: "This is spark #5 isn't that dandy",
            dev_notes: "these are my dev notes for spark 2",
            direct_link: "http://direct-link.com/spark2",
            article_text: "This is long form article text.",
            image_gallery: ["http://lorempixel.com/640/400/technics/5"],
            canned_video: "This is a canned video",
            created_at: "2016-01-06T20:49:22.000Z",
            updated_at: "2016-01-06T20:49:22.000Z",
            user_id: null,
            published: true,
            tags: ["tag 1", "tag 2", "tag 3"]
        },
        {
            id: 6,
            title: "Spark #6",
            summary: "This is spark #6 isn't that dandy",
            dev_notes: "these are my dev notes for spark 2",
            direct_link: "http://direct-link.com/spark2",
            article_text: "This is long form article text.",
            image_gallery: ["http://lorempixel.com/640/400/technics/6"],
            canned_video: "This is a canned video",
            created_at: "2016-01-06T20:49:22.000Z",
            updated_at: "2016-01-06T20:49:22.000Z",
            user_id: null,
            published: true,
            tags: ["tag 1", "tag 2", "tag 3"]
        },
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
