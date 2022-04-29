import Profile from "./Profile"
import React from "react"
import axios from "axios"
import { connect } from "react-redux"
import { setUserProfile } from "../../state/profile-reducer"

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/10`).then(response => {
      this.props.setUserProfile(response.data);
    })
  }

  render() {
    return (
      <Profile {...this.props} userProfile={this.props.userProfile}/>
    )
  }
};

const mapStateToProps = (state) => ({userProfile: state.profilePage.userProfile})



export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);
