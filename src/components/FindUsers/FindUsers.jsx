import classes from './FindUsers.module.css';
import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

const FindUsers = (props) => {
  return (
    <div className={classes.findUsers}>
      <Paginator findUsers={props.findUsers} totalItemsCount={props.findUsers.totalUsersCount} onSetPage={props.onSetPage} />
      {props.findUsers.users.map(u =>
        <User key={u.id} findUsers={props.findUsers} unfollowThunk={props.unfollowThunk} followThunk={props.followThunk} user={u} />
      )}
    </div>
  )
};

export default FindUsers;