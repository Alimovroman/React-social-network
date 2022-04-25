import * as axios from 'axios';
import classes from './FindUsers.module.css';
import avatar from './../../assets/images/avatar-for-users.png';
import React from 'react';

class FindUsers extends React.Component {
  constructor(props) {
    super(props);

    axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
      this.props.setUsers(response.data.items)
    })
  }

  getUsers = () => {
    alert('Hello Roman')
  }

  render() {
    return (
      <div className={classes.findUsers}>
        {this.props.findUsers.users.map(u =>
          <div key={u.id} className={classes.userProfile}>
            <div>
              <img src={u.photos.small !== null ? u.photos.small : avatar} alt='avatar' className={classes.avatar} />
              <div>
                {u.followed ?
                  <button onClick={() => this.props.unfollow(u.id)}>follow</button> :
                  <button onClick={() => this.props.follow(u.id)}>unfollow</button>}
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
          <button onClick={() => this.getUsers()}>Show more</button>
        </div>
      </div>
    )
  }
}

export default FindUsers;