import { connect } from "react-redux";
import { followedAC, setCurrentPageAC, setTotalUserCountAC, setUsersAC, toggleIsFetchingAC, unfollowedAC } from "../../findUsers-reducer";
import * as axios from 'axios';
import classes from './FindUsers.module.css';
import React from 'react';
import FindUsers from './FindUsers';
import Preloader from "../common/Preloader/Preloader";


class FindUsersPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.findUsers.currentPage}&count=${this.props.findUsers.pageSize}`).then
      (response => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
        this.props.setTotalCount(response.data.totalCount);
      })
  }

  getUsers = () => {
    alert('Hello Roman')
  }

  onSetPage = (pageNumber) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(pageNumber);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.findUsers.pageSize}`).then(response => {
      this.props.toggleIsFetching(false);
    this.props.setUsers(response.data.items);
    })
  }

  render() {

    return (
      <>
        {this.props.findUsers.isFetching ? <Preloader />: null}
        <FindUsers onSetPage={this.onSetPage} getUsers={this.getUsers} findUsers={this.props.findUsers}
          unfollow={this.props.unfollow} follow={this.props.follow} />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    findUsers: state.findUsers
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => dispatch(followedAC(userId)),
    unfollow: (userId) => dispatch(unfollowedAC(userId)),
    setUsers: (users) => dispatch(setUsersAC(users)),
    setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
    setTotalCount: (totalUserCount) => dispatch(setTotalUserCountAC(totalUserCount)),
    toggleIsFetching: (isFetching) => dispatch(toggleIsFetchingAC(isFetching))
  }
}

const FindUsersContainer = connect(mapStateToProps, mapDispatchToProps)(FindUsersPageContainer);

export default FindUsersContainer;