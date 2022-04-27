import * as axios from 'axios';
import classes from './FindUsers.module.css';
import avatar from './../../assets/images/avatar-for-users.png';
import React from 'react';
import { NavLink } from 'react-router-dom';

class FindUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.findUsers.currentPage}&count=${this.props.findUsers.pageSize}`).then
    (response => {
      this.props.setUsers(response.data.items);
      this.props.setTotalCount(response.data.totalCount);
    })
  }

  getUsers = () => {
    alert('Hello Roman')
  }

  onSetPage = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.findUsers.pageSize}`).then(response => {
      this.props.setUsers(response.data.items)
    })
  }

  render() {
    let pageUsers = Math.ceil(this.props.findUsers.totalUsersCount / this.props.findUsers.pageSize);
    let pagesData = [];
    for (let i = 1; i <= pageUsers; i++) {
      pagesData.push(i);
    }

    return (
      <div className={classes.findUsers}>
        <div>
          {pagesData.map(p =>
          (<button key={p} onClick={() => this.onSetPage(p)}
            className={this.props.findUsers.currentPage === p ? classes.selectedPage : classes.buttonPage}>
            {p}
          </button>))}
        </div>
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