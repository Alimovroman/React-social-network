import Profile from "./Profile"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getProfileThunk, getStatusThunk, putStatusThunk } from "../../state/profile-reducer"
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
  }, []);
  useEffect(() => {
    props.getStatusThunk(userId)
  })

  return (
    <Profile {...props} userProfile={props.userProfile} putStatusThunk={props.putStatusThunk} userId={userId}/>
  )
}

const mapStateToProps = (state) => ({
  userProfile: state.profilePage.userProfile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
});

export default compose(connect(mapStateToProps, { getProfileThunk, getStatusThunk, putStatusThunk }),
  withAuthRedirect)(ProfileContainer);