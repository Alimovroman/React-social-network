import classes from './../Nav.module.css'
import FriendItem from './FriendItem/FriendItem';
import React, { FC } from 'react';
import { FriendsSideBarType } from '../../../state/sideBar-reducer';

type PropsType = {
  friends: FriendsSideBarType[]
}

const Friends: FC<PropsType> = ({friends}) => {
  let friendElement = friends.map(friends => <FriendItem key={friends.id} name={friends.name} />);
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