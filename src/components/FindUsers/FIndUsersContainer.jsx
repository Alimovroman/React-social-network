import { connect } from "react-redux";
import { followedAC, setUsersAC, unfollowedAC } from "../../findUsers-reducer";
import FindUsers from "./FindUsers";

const mapStateToProps = (state) => {
  return {
    findUsers: state.findUsers
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => dispatch(followedAC(userId)),
    unfollow: (userId) => dispatch(unfollowedAC(userId)),
    setUsers: (users) => dispatch(setUsersAC(users))
  }
}

const FindUsersContainer = connect(mapStateToProps, mapDispatchToProps)(FindUsers);

export default FindUsersContainer;