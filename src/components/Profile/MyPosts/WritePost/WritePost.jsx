import classes from './WritePost.module.css';

const WritePost = () => {
  return (
    <div className={classes.writePost}>
      <div>
        <textarea maxLength='250' cols='80' rows='3' placeholder='your news...'></textarea>
      </div>
      <button>Send</button>
    </div>
  )
};

export default WritePost;