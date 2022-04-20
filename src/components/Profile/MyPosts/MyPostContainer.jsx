import StoreContext from '../../../SroreContext';
import store from '../../../state/store';
import MyPosts from './MyPosts';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import WritePost from './WritePost/WritePost';

const MyPostsContainer = (props) => {
  //let postElement = props.profilePage.postData.map(post => <Post key={post.id} message={post.message} likeCount={post.likeCount} />)
  //dispatch={store.dispatch.bind(store)}

  //let profilePage = props.store.getState().profilePage;

  //dispatch={props.store.dispatch}

  return (
    <StoreContext.Consumer>
      {(store) => {
        let profilePage = store.getState().profilePage;
        return (
          <MyPosts profilePage={profilePage} />
        )
      }
      }
    </StoreContext.Consumer>

  )
};

export default MyPostsContainer;