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

  addPost(postMessage) {
    let newPost = {
      id: 5, message: postMessage, likeCount: 0
    };
    this._state.profilePage.postData.push(newPost);
    this.rerenderEntireTree();
    this._state.profilePage.newPostText = '';
  },

  changePostText(text)  {
    this._state.profilePage.newPostText = text;
    this.rerenderEntireTree()
  },
  
  addMessage(textMessage) {
    let newMessage = {
      id: 7, message: textMessage
    }
    this._state.messagesPage.messagesData.push(newMessage);
    this.rerenderEntireTree();
    this._state.messagesPage.newMessageText = '';
  },

  changeMessageText(text) {
    this._state.messagesPage.newMessageText = text;
    this.rerenderEntireTree()
  },

  rerenderEntireTree() {
    console.log('yo yo yo')
  },

  subscribe(observer) {
    this.rerenderEntireTree = observer;
  }
};

export default store;