
import profileReducer, { addPostActionCreator, deletePost } from './profile-reducer';
let state = {
  postData: [
    { id: 1, message: 'Hi, how are you?', likeCount: '7' },
    { id: 2, message: 'Go to play in poker?', likeCount: '14' },
    { id: 3, message: 'Do you wont eat?', likeCount: '19' },
    { id: 4, message: 'yo yo yo', likeCount: '32' }
  ],
};

test('length of post should be incremented', () => {
  let action = addPostActionCreator(`Hello`);
  let newState = profileReducer(state, action);
  expect(newState.postData.length).toBe(5);
});

test('add Hello in message', () => {
  let action = addPostActionCreator(`Hello`);
  let newState = profileReducer(state, action);
  expect(newState.postData[4].message).toBe(`Hello`)
});

test('delete post', () => {
  let action = deletePost(1);
  let newState = profileReducer(state, action);
  expect(newState.postData.length).toBe(3)
});
