import classes from './FindUsers.module.css';
import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UsersType } from '../../types/types';
import { FilterUsers, InitialStateTypeForFindUsers } from '../../state/findUsers-reducer';
import SearchUsersFormic from './UsersSearchFormic';

type PropsType = {
  onSetPage: (pageNumber: number) => void
  findUsers: InitialStateTypeForFindUsers
  unfollowThunk: (id: number) => void
  followThunk: (id: number) => void
  onSearchUsers: (filter: FilterUsers) => void
}

const FindUsers: React.FC<PropsType> = ({ onSetPage, findUsers, unfollowThunk, followThunk, onSearchUsers }) => {
  return (
    <div className={classes.findUsers}>
    <SearchUsersFormic onSearchUsers={onSearchUsers}/>
      <Paginator findUsers={findUsers} totalItemsCount={findUsers.totalUsersCount} onSetPage={onSetPage} />
      {findUsers.users.map((u: UsersType) =>
        <User key={u.id} followedInProgress={findUsers.followedInProgress} unfollowThunk={unfollowThunk} followThunk={followThunk} user={u} />
      )}
    </div>
  )
};




      export default FindUsers;