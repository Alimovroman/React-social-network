import { connect } from "react-redux";
import { RootState } from "../../../state/redux-store";
import Friends from "./Friends";

let mapStateToProps = (state: RootState) => {
  return {
    friends: state.sideBar.friends
  }
}

const FriendsContainer = connect(mapStateToProps)(Friends);

export default FriendsContainer;