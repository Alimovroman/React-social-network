import classes from './../Nav.module.css'
import FriendItem from './FriendItem/FriendItem';
import React from 'react';

const Friends = (props) => {
  let friendElement = props.friends.map(friends => <FriendItem key={friends.id} name={friends.name} />);
  return (
    <div>
      <h2>Friends</h2>
      <div className={classes.friendElement}>
        {friendElement}
      </div>
    </div>
  )
}

export default Friends;