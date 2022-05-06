import classes from './FindUsers.module.css';
import avatar from './../../assets/images/avatar-for-users.png';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { userApi } from '../../api/api';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { toggleIsFetching } from '../../state/findUsers-reducer';

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
                  props.toggleIsFollowedInProgress(u.id, true)
                  userApi.postFollowed(u.id).then(response => {
                    if (response.data.resultCode == 0) {
                      props.unfollow(u.id)
                      console.log(response.resultCode + 'follow')
                    }
                    props.toggleIsFollowedInProgress(u.id, false)
                  })
                }}>unfollow</button> :
                <button disabled={props.findUsers.followedInProgress.some(id=> id === u.id) } onClick={() => {
                   props.toggleIsFollowedInProgress(u.id,true)
                  userApi.deleteFollowed(u.id).then(response => {
                    console.log(response.resultCode + 'unfollow')
                    //if (response.data.resultCode == 0) {
                    props.follow(u.id)
                    // }
                    props.toggleIsFollowedInProgress(u.id, false)
                  })
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