import classes from './FindUsers.module.css';
import avatar from './../../assets/images/avatar-for-users.png';
import React from 'react';
import { NavLink } from 'react-router-dom';

const FindUsers = (props) => {
  let pageUsers = Math.ceil(props.findUsers.totalUsersCount / props.findUsers.pageSize);
  let pagesData = [];
  for (let i = 1; i <= pageUsers; i++) {
    pagesData.push(i);
  }

  return (
    <div className={classes.findUsers}>
      <div>
        {pagesData.map(p =>
        (<button key={p} onClick={() => props.onSetPage(p)}
          className={props.findUsers.currentPage === p ? classes.selectedPage : classes.buttonPage}>
          {p}
        </button>))}
      </div>
      {props.findUsers.users.map(u =>
        <div key={u.id} className={classes.userProfile}>
          <div>
            <NavLink to={`/profile/${u.id}`}>
              <img src={u.photos.small !== null ? u.photos.small : avatar} alt='avatar' className={classes.avatar} />
            </NavLink>
            <div>
              {u.followed ?
                <button disabled={props.findUsers.followedInProgress.some(id=> id === u.id)} onClick={() => {
                  props.unfollowThunk(u.id)
                }}>unfollow</button> :
                <button disabled={props.findUsers.followedInProgress.some(id=> id === u.id) } onClick={() => {
                  props.followThunk(u.id)
                }}>follow</button>}
            </div>
          </div>
          <div className={classes.userInfo}>
            <div>
              <div>{u.status}</div>
              <div>{u.name}</div>
            </div>
            <div>
              <div>{'u.location.country'}</div>
              <div>{'u.location.city'}</div>
            </div>
          </div>
        </div>
      )}
      <div>
        <button onClick={() => alert(`Hello`)}>Show more</button>
      </div>
    </div>
  )
};

export default FindUsers;