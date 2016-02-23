// A re-usable spec for confirming props of the Spark model
// Return true if the property exists and is defined, return false if undefined.
export function SparkPropConfirm(spark_obj, prop_name){
  switch (prop_name){
    case "longform" :
      return spark_obj["longform"].length !== 0;
    case "dev_notes" :
      return spark_obj["dev_notes"].length !== 0 && hasRightTech();
    case "direct_link" :
      return spark_obj["direct_link"].length !== 0;
    case "images" :
      return spark_obj["images"].length !== 0;
    case "video" :
      return spark_obj["canned_video"].url !== null || spark_obj["video_url"].length !== 0;
    default :
      console.error("unknow prop type of Spark");
      return false;
  }
}

/*
** Check User Permissions
*/
import UserStore from './stores/UserStore';
const ROLE_ADMIN = "admin";
const ROLE_TECH = "tech";
const ROLE_NONTECH = "nontech";

export function hasRightsAdmin(){
  return UserStore.getState().user_role == ROLE_ADMIN;
}
export function hasRightTech(){
  return UserStore.getState().user_role == ROLE_ADMIN || UserStore.getState().user_role == ROLE_TECH
}