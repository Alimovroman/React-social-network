import { FollowPost, ResultCodeEnum, userApi } from './../api/api';
import { followThunkCreator } from "./findUsers-reducer";
jest.mock('./../api/api')

const userApiMock = userApi as jest.Mocked<any>

const result: FollowPost = {
  resultCode: ResultCodeEnum.Success,
  messages: [],
  data: {}
}

userApiMock.postFollowed.mockReturnValue(Promise.resolve(result))

test('follow success thunk', async () => {
  const thunk = followThunkCreator(1)

  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
})