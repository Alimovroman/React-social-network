import classes from './FindUsers.module.css';
import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UsersType } from '../../types/types';
import { InitialStateTypeForFindUsers } from '../../state/findUsers-reducer';

type PropsType = {
  onSetPage: (pageNumber: number) => void
  findUsers: InitialStateTypeForFindUsers
  unfollowThunk: (id: number) => void
  followThunk: (id: number) => void
}

const FindUsers: React.FC<PropsType> = ({ onSetPage, findUsers, unfollowThunk, followThunk }) => {
  return (
    <div className={classes.findUsers}>
      <Paginator findUsers={findUsers} totalItemsCount={findUsers.totalUsersCount} onSetPage={onSetPage} />
      {findUsers.users.map((u: UsersType) =>
        <User key={u.id} followedInProgress={findUsers.followedInProgress} unfollowThunk={unfollowThunk} followThunk={followThunk} user={u} />
      )}
    </div>
  )
};

export default FindUsers;