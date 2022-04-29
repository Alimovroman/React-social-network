const ADD_POST = 'ADD-POST';
const CHANGE_POST_TEXT = 'CHANGE-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
  postData: [
    { id: 1, message: 'Hi, how are you?', likeCount: '7' },
    { id: 2, message: 'Go to play in poker?', likeCount: '14' },
    { id: 3, message: 'Do you wont eat?', likeCount: '19' },
    { id: 4, message: 'yo yo yo', likeCount: '32' }
  ],
  userProfile: null,
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

    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile
      };

    default:
      return state
  };
};

export const addPostActionCreator = (text) => ({ type: ADD_POST, postMessage: text });
export const onPostChangeActionCreator = (newText) => {
  return {
    type: CHANGE_POST_TEXT, text: newText
  }
};
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile});

export default profileReducer;