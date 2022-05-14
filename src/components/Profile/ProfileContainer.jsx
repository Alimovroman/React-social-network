import Profile from "./Profile"
import React, { useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getProfileThunk, getStatusThunk, putStatusThunk } from "../../state/profile-reducer"
import { useParams } from "react-router-dom"
import withAuthRedirect from "../HOC/WithAuthRedirect"
import { compose } from "redux"

const ProfileContainerNew = (props) => {
  let { userId } = useParams();
  if (!userId) {
    userId = 6990
  }
  useEffect(() => {
    props.getProfileThunk(userId);
  }, [userId]);
  useEffect(() => {
    props.getStatusThunk(userId)
  })

  return (
    <Profile {...props} userProfile={props.userProfile} putStatusThunk={props.putStatusThunk} userId={userId}/>
  )
}

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/11`).then(response => {
      this.props.setUserProfile(response.data);
      console.log(response.data.userId)
    })
  }

  render() {
    return (
      <Profile {...this.props} userProfile={this.props.userProfile} />
    )
  }
};

const mapStateToProps = (state) => ({
  userProfile: state.profilePage.userProfile,
  status: state.profilePage.status
});

export default compose(connect(mapStateToProps, { getProfileThunk, getStatusThunk, putStatusThunk }),
  withAuthRedirect)(ProfileContainerNew);