import { connect } from "react-redux";
import { followed, setCurrentPage, setTotalUserCount, setUsers, toggleIsFetching, unfollowed } from "../../findUsers-reducer";
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
    this.props.toggleIsFetching(true);
    userApi.getUsers(this.props.findUsers.currentPage, this.props.findUsers.pageSize).then(response => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(response.items);
      this.props.setTotalUserCount(response.totalCount);
    })

  }

  onSetPage = (pageNumber) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(pageNumber);
    userApi.getUsers(pageNumber, this.props.findUsers.pageSize).then(response => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(response.items);
    })
  }

  render() {

    return (
      <>
        {this.props.findUsers.isFetching ? <Preloader /> : null}
        <FindUsers onSetPage={this.onSetPage} findUsers={this.props.findUsers}
          unfollow={this.props.unfollowed} follow={this.props.followed} />
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
  followed,
  unfollowed,
  setUsers,
  setCurrentPage,
  setTotalUserCount,
  toggleIsFetching
})(FindUsersPageContainer);

export default FindUsersContainer;