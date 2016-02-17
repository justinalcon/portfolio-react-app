// A re-usable spec for confirming props of the Spark model
// Return true if the property exists and is defined, return false if undefined.
export function SparkPropConfirm(spark_obj, prop_name){
  switch (prop_name){
    case "longform" :
      return spark_obj["longform"].length !== 0;
    case "dev_notes" :
      return spark_obj["dev_notes"].length !== 0;
    case "direct_link" :
      return spark_obj["direct_link"].length !== 0;
    case "images" :
      // spark_images[] should always be defined. this is a workaround as the endpoint is being fixed.
      return false; //spark_obj.spark_images !== undefined && spark_obj["spark_images"].length !== 0;
    case "video" :
      return spark_obj["canned_video"].url !== null || spark_obj["video_url"].length !== 0;
    default :
      console.error("unknow prop type of Spark");
      return false;
  }
}