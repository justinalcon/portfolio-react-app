// A re-usable spec for confirming props of the Spark model
// Return true if the property exists and is defined, return false if undefined.
export function PropConfirm(spark_obj, prop_name){
  switch (prop_name){
    // TODO add all tech properties here
    case "images" :
      return spark_obj["images"].length !== 0;
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
