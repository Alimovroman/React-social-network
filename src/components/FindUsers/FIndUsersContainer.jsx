import { connect } from "react-redux";
import { followThunkCreator, getUsersThunkCreator, unfollowThunkCreator } from "../../state/findUsers-reducer";
import classes from './FindUsers.module.css';
import React from 'react';
import FindUsers from './FindUsers';
import Preloader from "../common/Preloader/Preloader";
import withAuthRedirect from "../HOC/WithAuthRedirect";
import { compose } from "redux";
import { getFindUsers } from "../../state/findUsers-selectors";


class FindUsersPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsersThunk(this.props.findUsers.currentPage, this.props.findUsers.pageSize)
  }

  onSetPage = (pageNumber) => {
    this.props.getUsersThunk(pageNumber, this.props.findUsers.pageSize)
  }

  render() {
    return (
      <>
        {this.props.findUsers.isFetching ? <Preloader /> : null}
        <FindUsers onSetPage={this.onSetPage} findUsers={this.props.findUsers} 
          unfollowThunk={this.props.unfollowThunk} followThunk={this.props.followThunk} />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    findUsers: getFindUsers(state)
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => dispatch(followedAC(userId)),
//     unfollow: (userId) => dispatch(unfollowedAC(userId)),
//     setUsers: (users) => dispatch(setUsersAC(users)),
//     setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
//     setTotalCount: (totalUserCount) => dispatch(setTotalUserCountAC(totalUserCount)),
//     toggleIsFetching: (isFetching) => dispatch(toggleIsFetchingAC(isFetching))
//   }
// }

export default compose(
  //withAuthRedirect,
  connect(mapStateToProps, {
  getUsersThunk: getUsersThunkCreator,
  unfollowThunk: unfollowThunkCreator,
  followThunk: followThunkCreator
}))(FindUsersPageContainer);