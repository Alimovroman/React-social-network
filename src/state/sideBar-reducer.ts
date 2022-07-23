type InitialStateType = {
  friends: {
    id: number,
    name: string
  }[]
}

let initialState: InitialStateType = {
  friends: [
    {id:1, name: 'Alexander'},
    {id:2, name: 'Pusya'},
    {id:3, name: 'Kolya'}
  ]
}

const sideBarReducer = (state = initialState, action: any): InitialStateType => {

  return state
};

export default sideBarReducer;
