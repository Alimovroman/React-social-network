import findUserReducer, { actionsFindUsers, InitialStateTypeForFindUsers } from "./findUsers-reducer"

let state: InitialStateTypeForFindUsers
beforeEach(() => {
  state = { // 1 часть тестов это стейт
    users: [{
      followed: false, id: 0, name: 'Roman0', photos: {small: null, large: null}, status: '0'
    },
    {
      followed: false, id: 1, name: 'Roman1', photos: {small: null, large: null}, status: '1'
    },
    {
      followed: true, id: 2, name: 'Roman2', photos: {small: null, large: null}, status: '2'
    },
    {
      followed: true, id: 3, name: 'Roman3', photos: {small: null, large: null}, status: '3'
    }],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followedInProgress: [],
  }
})

test('testFollowUsers' , () => {
  const newState = findUserReducer(state, actionsFindUsers.followed(1))  // 2 часть это редюсер          
  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()      // 3 часть это уже то что хотим увидеть

})

test('testUnfollowUsers', () => {
  const newState = findUserReducer(state, actionsFindUsers.unfollowed(3))
  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})