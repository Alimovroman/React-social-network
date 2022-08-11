import Profile from "./Profile"
import React, { FC, useEffect } from "react"
import { connect } from "react-redux"
import { getProfileThunk, getStatusThunk, putStatusThunk, savePhoto, saveProfileInfo } from "../../state/profile-reducer"
import { useParams } from "react-router-dom"
import withAuthRedirect from "../HOC/WithAuthRedirect"
import { compose } from "redux"
import { RootState } from "../../state/redux-store"
import { UserProfileType } from "../../types/types"

type PropsType = MapStateToPropsType & MapDispatchToPropsType

const ProfileContainer: FC<PropsType> = ({ userProfile, authorizedUserId, status, getProfileThunk, getStatusThunk,
  putStatusThunk, savePhoto, saveProfileInfo }) => {
  let { userId } = useParams();
  if (!userId) {
    userId = String(authorizedUserId)
  }
  useEffect(() => {
    getProfileThunk(userId!);
  }, [userId]);
  useEffect(() => {
    getStatusThunk(userId!)
  }, [userId])

  return (
    <Profile userProfile={userProfile!}
      putStatusThunk={putStatusThunk} userId={userId} isOwner={Number(userId) === authorizedUserId}
      savePhoto={savePhoto} saveProfileInfo={saveProfileInfo} status={status} authorizedUserId={authorizedUserId!} />
  )
}

type MapStateToPropsType = {
  userProfile: UserProfileType | null
  status: string
  authorizedUserId: number | null
}
type MapDispatchToPropsType = {
  getProfileThunk: (userId: string) => void
  getStatusThunk: (userId: string) => void
  putStatusThunk: (status: string) => void
  savePhoto: (photo: File) => void
  saveProfileInfo: (userProfile: UserProfileType) => Promise<any>
}

const mapStateToProps = (state: RootState): MapStateToPropsType => ({
  userProfile: state.profilePage.userProfile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  //isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(connect(mapStateToProps, { getProfileThunk, getStatusThunk, putStatusThunk, savePhoto, saveProfileInfo }),
  withAuthRedirect)(ProfileContainer);