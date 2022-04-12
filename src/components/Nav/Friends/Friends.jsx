import classes from './../Nav.module.css'
import FriendItem from './FriendItem/FriendItem';

const Friends = (props) => {
  let friendElement = props.friends.map(friends => <FriendItem name={friends.name} />);
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