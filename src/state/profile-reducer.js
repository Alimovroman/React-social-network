const ADD_POST = 'ADD-POST';
const CHANGE_POST_TEXT = 'CHANGE-POST-TEXT';

let initialState = {
  postData: [
    { id: 1, message: 'Hi, how are you?', likeCount: '7' },
    { id: 2, message: 'Go to play in poker?', likeCount: '14' },
    { id: 3, message: 'Do you wont eat?', likeCount: '19' },
    { id: 4, message: 'yo yo yo', likeCount: '32' }
  ],
  newPostText: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: 
      let newPost = {
        id: 5, message: action.postMessage, likeCount: 0
      };
      return {
        ...state,
        postData: [...state.postData, newPost],
        newPostText: ''
      };
      //stateCopy.postData = [...state.postData];
      //stateCopy.postData.push(newPost);
      //stateCopy.newPostText = '';

    case CHANGE_POST_TEXT: 
      return {
        ...state,
        newPostText: action.text
      };
      
    default:
      return state
  };
};

export const addPostActionCreator = (text) => ({type: ADD_POST, postMessage: text});
export const onPostChangeActionCreator = (newText) => {
  return {
    type: CHANGE_POST_TEXT, text: newText
  }
};

export default profileReducer;