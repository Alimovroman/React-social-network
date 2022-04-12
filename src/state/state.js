let state = {
  profilePage: {
    postData: [
      { id: 1, message: 'Hi, how are you?', likeCount: '7' },
      { id: 2, message: 'Go to play in poker?', likeCount: '14' },
      { id: 3, message: 'Do you wont eat?', likeCount: '19' },
      { id: 4, message: 'yo yo yo', likeCount: '32' }
    ]
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
  },
  sideBar: {
    friends: [
      {id:1, name: 'Alexander'},
      {id:2, name: 'Pusya'},
      {id:3, name: 'Kolya'}
    ]
  }
}

export default state;