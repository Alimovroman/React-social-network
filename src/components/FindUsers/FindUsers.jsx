import classes from './FindUsers.module.css';
import avatar from './../../assets/images/avatar-for-users.png';
import React from 'react';

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
            <img src={u.photos.small !== null ? u.photos.small : avatar} alt='avatar' className={classes.avatar} />
            <div>
              {u.followed ?
                <button onClick={() => props.unfollow(u.id)}>follow</button> :
                <button onClick={() => props.follow(u.id)}>unfollow</button>}
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
        <button onClick={() => props.getUsers()}>Show more</button>
      </div>
    </div>
  )
};

export default FindUsers;