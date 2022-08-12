import { connect } from "react-redux";
import { FilterUsers, followThunkCreator, getUsersThunkCreator, InitialStateTypeForFindUsers, unfollowThunkCreator } from "../../state/findUsers-reducer";
import React from 'react';
import FindUsers from './FindUsers';
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { getFindUsers } from "../../state/findUsers-selectors";
import { RootState } from "../../state/redux-store";

type PropsType = {
  findUsers: InitialStateTypeForFindUsers
  getUsersThunk: (currentPage: number, pageSize: number, filter: FilterUsers ) => void
  unfollowThunk: (id: number) => void
  followThunk: (id: number) => void
}

class FindUsersPageContainer extends React.Component<PropsType> {
  componentDidMount() {
    let {currentPage, pageSize, filter} = this.props.findUsers
    this.props.getUsersThunk(currentPage, pageSize, filter)
  }

  onSetPage = (pageNumber: number) => {
    const {pageSize, filter} = this.props.findUsers
    this.props.getUsersThunk(pageNumber, pageSize, filter)
  }

  onSearchUsers = (filter: FilterUsers) => {
    let {currentPage, pageSize} = this.props.findUsers
    this.props.getUsersThunk(1, pageSize, filter)
  }

  render() {
    return (
      <>
        {this.props.findUsers.isFetching ? <Preloader /> : null}
        <FindUsers onSetPage={this.onSetPage} findUsers={this.props.findUsers}
          unfollowThunk={this.props.unfollowThunk} followThunk={this.props.followThunk} onSearchUsers={this.onSearchUsers}/>
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => {
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