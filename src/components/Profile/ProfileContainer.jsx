import Profile from "./Profile"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getProfileThunk, getStatusThunk, putStatusThunk, savePhoto, saveProfileInfo } from "../../state/profile-reducer"
import { useParams } from "react-router-dom"
import withAuthRedirect from "../HOC/WithAuthRedirect"
import { compose } from "redux"

const ProfileContainer = (props) => {
  let { userId } = useParams();
  if (!userId) {
    userId = props.authorizedUserId
  }
  useEffect(() => {
    props.getProfileThunk(userId);
  }, [userId]);
  useEffect(() => {
    props.getStatusThunk(userId)
  }, [userId])

  return (
    <Profile {...props} userProfile={props.userProfile}
      putStatusThunk={props.putStatusThunk} userId={userId} isOwner={userId === props.authorizedUserId}
      savePhoto={props.savePhoto} saveProfileInfo={props.saveProfileInfo}/>
  )
}

const mapStateToProps = (state) => ({
  userProfile: state.profilePage.userProfile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
});

export default compose(connect(mapStateToProps, { getProfileThunk, getStatusThunk, putStatusThunk, savePhoto, saveProfileInfo }),
  withAuthRedirect)(ProfileContainer);