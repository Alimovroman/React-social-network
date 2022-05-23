import { connect } from "react-redux";
import { followThunkCreator, getUsersThunkCreator, unfollowThunkCreator } from "../../state/findUsers-reducer";
import React from 'react';
import FindUsers from './FindUsers';
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { getFindUsers } from "../../state/findUsers-selectors";


class FindUsersPageContainer extends React.Component {
  componentDidMount() {
    let {currentPage, pageSize} = this.props.findUsers
    this.props.getUsersThunk(currentPage, pageSize)
  }

  onSetPage = (pageNumber) => {
    const {pageSize} = this.props.findUsers
    this.props.getUsersThunk(pageNumber, pageSize)
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

export default compose(
  connect(mapStateToProps, {
    getUsersThunk: getUsersThunkCreator,
    unfollowThunk: unfollowThunkCreator,
    followThunk: followThunkCreator
  }))(FindUsersPageContainer);