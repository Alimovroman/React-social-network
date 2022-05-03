import Profile from "./Profile"
import React, { useEffect } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { setUserProfile } from "../../state/profile-reducer"
import { useNavigate, useParams } from "react-router-dom"

const ProfileContainerNew = (props) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    if (!userId) {
      axios.get(`https://social-network.samuraijs.com/api/1.0/profile/10`).then(response => {
        props.setUserProfile(response.data);
      })
    }
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
      props.setUserProfile(response.data);
    })
  }, [userId]);

  return (
    <Profile {...props} userProfile={props.userProfile} />
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

const mapStateToProps = (state) => ({ userProfile: state.profilePage.userProfile });


export default connect(mapStateToProps, { setUserProfile })(ProfileContainerNew);
