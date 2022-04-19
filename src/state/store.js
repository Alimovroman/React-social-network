import messageReducer from "./message-reducer";
import profileReducer from "./profile-reducer";
import sideBarReducer from "./sideBar-reducer";

let store = {
  _state: {
    profilePage: {
      postData: [
        { id: 1, message: 'Hi, how are you?', likeCount: '7' },
        { id: 2, message: 'Go to play in poker?', likeCount: '14' },
        { id: 3, message: 'Do you wont eat?', likeCount: '19' },
        { id: 4, message: 'yo yo yo', likeCount: '32' }
      ],
      newPostText: ''
    },
    messagesPage: {
      messagesData: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'I like to sing in shower'},
        {id: 4, message: 'i`m really hungry'},
      ],
      dialogsData: [
        {id: 1,  name: 'Alexander'},
        {id: 2,  name: 'Pusya'},
        {id: 3,  name: 'Chucha'},
        {id: 4,  name: 'Kolya'},
        {id: 5,  name: 'Terenazavr'},
        {id: 6,  name: 'SuperMan'}
      ],
      newMessageText: ''
    },
    sideBar: {
      friends: [
        {id:1, name: 'Alexander'},
        {id:2, name: 'Pusya'},
        {id:3, name: 'Kolya'}
      ]
    }
  },
  setState() {
    return this._state;
  },

  rerenderEntireTree() {
    console.log('yo yo yo')
  },
  subscribe(observer) {
    this.rerenderEntireTree = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = messageReducer(this._state.messagesPage, action);
    this._state.sideBar =sideBarReducer(this._state.sideBar, action);

    this.rerenderEntireTree()
  },

};

export default store;