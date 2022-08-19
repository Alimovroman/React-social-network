import classes from './FindUsers.module.css';
import React, { useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UsersType } from '../../types/types';
import { FilterUsers, followThunkCreator, getUsersThunkCreator, InitialStateTypeForFindUsers, unfollowThunkCreator } from '../../state/findUsers-reducer';
import SearchUsersFormic from './UsersSearchFormic';
import { useSelector } from 'react-redux';
import { getFindUsers } from '../../state/findUsers-selectors';
import { useDispatch } from 'react-redux';
import { RootState } from '../../state/redux-store';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useLocation, useNavigate } from 'react-router-dom';
import { parse, parseUrl } from 'query-string';



const FindUsers: React.FC = () => {
  const findUsers = useSelector(getFindUsers)
  const {currentPage, pageSize, filter, isFetching} = useSelector((state: RootState) => state.findUsers)
  const dispatch = useDispatch<ThunkDispatch<RootState, void, Action>>()
  const navigate = useNavigate()
  const location = useLocation()


  
  useEffect(() => {
    navigate({
      pathname: `/developers`,
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    })
  }, [filter, currentPage])

  useEffect(() => {
    const parsed = parse(location.search)
    let actualPage = currentPage
    let actualFilter = filter
    if (parsed.page ) actualPage= Number(parsed.page)
    if (parsed.term)  actualFilter = {...actualFilter, term: parsed.term as string}
    if (parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false}
      dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter)) 
  }, []) 

  const onSetPage = (pageNumber: number) => {
    dispatch(getUsersThunkCreator(pageNumber, pageSize, filter))
  }

  const onSearchUsers = (filter: FilterUsers) => {
    dispatch(getUsersThunkCreator(1, pageSize, filter))
  }

  const followThunk = (id : number) => {
    dispatch(followThunkCreator(id))
  }

  const unfollowThunk = (id: number) => {
    dispatch(unfollowThunkCreator(id))
  }
  
  return (
    <div className={classes.findUsers}>
    <SearchUsersFormic onSearchUsers={onSearchUsers}/>
      <Paginator findUsers={findUsers} totalItemsCount={findUsers.totalUsersCount} onSetPage={onSetPage} />
      {findUsers.users.map((u: UsersType) =>
        <User key={u.id} followedInProgress={findUsers.followedInProgress} unfollowThunk={unfollowThunk} followThunk={followThunk} user={u} />
      )}
    </div>
  )
};




      export default FindUsers;