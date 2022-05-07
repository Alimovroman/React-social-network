import { connect } from "react-redux";
import { followThunkCreator, getUsersThunkCreator, unfollowThunkCreator } from "../../state/findUsers-reducer";
import classes from './FindUsers.module.css';
import React from 'react';
import FindUsers from './FindUsers';
import Preloader from "../common/Preloader/Preloader";
import { userApi } from "../../api/api";


class FindUsersPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsersThunk(this.props.findUsers.currentPage, this.props.findUsers.pageSize)
    // this.props.toggleIsFetching(true);
    // userApi.getUsers(this.props.findUsers.currentPage, this.props.findUsers.pageSize).then(response => {
    //   this.props.toggleIsFetching(false);
    //   this.props.setUsers(response.items);
    //   this.props.setTotalUserCount(response.totalCount);
    // })

  }

  onSetPage = (pageNumber) => {
    this.props.getUsersThunk(pageNumber, this.props.findUsers.pageSize)
    // this.props.toggleIsFetching(true);
    // this.props.setCurrentPage(pageNumber);
    // userApi.getUsers(pageNumber, this.props.findUsers.pageSize).then(response => {
    //   this.props.toggleIsFetching(false);
    //   this.props.setUsers(response.items);
    // })
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
    findUsers: state.findUsers
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

const FindUsersContainer = connect(mapStateToProps, {
  getUsersThunk: getUsersThunkCreator,
  unfollowThunk: unfollowThunkCreator,
  followThunk: followThunkCreator
})(FindUsersPageContainer);

export default FindUsersContainer;