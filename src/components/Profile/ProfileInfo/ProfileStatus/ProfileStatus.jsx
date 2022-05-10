import React from "react";

class ProfileStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
    this.activateEditMode = this.activateEditMode.bind(this);
  }
  activateEditMode() {
    this.setState(()=> !this.state.editMode ? {editMode: true} : {editMode: false})
  }
  render() {
    return (
      <div>
        {!this.state.editMode
          ? <span onDoubleClick={()=> this.activateEditMode()}>{this.props.profileStatus}</span>
          : <input autoFocus={true} type='text' value={this.props.profileStatus} onBlur={()=> this.activateEditMode()}/>}
      </div>
    )
  }
}

export default ProfileStatus;