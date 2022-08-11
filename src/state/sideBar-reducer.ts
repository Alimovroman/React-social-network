export type FriendsSideBarType = {
  id: number,
  name: string
}

type InitialStateType = typeof initialState

let initialState = {
  friends: [
    { id: 1, name: 'Alexander' },
    { id: 2, name: 'Pusya' },
    { id: 3, name: 'Kolya' }
  ] as FriendsSideBarType[]
}

const sideBarReducer = (state = initialState): InitialStateType => {

  return state
};

export default sideBarReducer;
