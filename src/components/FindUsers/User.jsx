import classes from './FindUsers.module.css';
import avatar from './../../assets/images/avatar-for-users.png';
import { NavLink } from 'react-router-dom';
import React from 'react';

const User = ({findUsers: {followedInProgress}, user, unfollowThunk, followThunk}) => {
  return (
    <div className={classes.userProfile}>
      <div>
        <NavLink to={`/profile/${user.id}`}>
          <img src={user.photos.small !== null ? user.photos.small : avatar} alt='avatar' className={classes.avatar} />
        </NavLink>
        <div>
          {user.followed ?
            <button disabled={followedInProgress.some(id => id === user.id)} onClick={() => {
              unfollowThunk(user.id)
            }}>unfollow</button> :
            <button disabled={followedInProgress.some(id => id === user.id)} onClick={() => {
              followThunk(user.id)
            }}>follow</button>}
        </div>
      </div>
      <div className={classes.userInfo}>
        <div>
          <div>{user.status}</div>
          <div>{user.name}</div>
        </div>
        <div>
          <div>{'u.location.country'}</div>
          <div>{'u.location.city'}</div>
        </div>
      </div>
    </div>
  )
};

export default User;