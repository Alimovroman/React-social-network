import React from "react";

class ProfileStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      status: this.props.status,
    };
    this.activateEditMode = this.activateEditMode.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.deactivateEditMode = this.deactivateEditMode.bind(this)
  }
  
  onStatusChange(e) {
    this.setState({
      status: e.currentTarget.value
    })
    
  }
  activateEditMode() {
    this.setState({
      editMode: true 
    });
  }
  deactivateEditMode() {
    this.props.putStatus(this.state.status);
     setTimeout(() => {
      this.setState({
        editMode: false
      });
     },200)  
    
  }
  render() {
    return (
      <div>
        {!this.state.editMode
          ? <span onDoubleClick={() => this.activateEditMode()}>{this.props.status || `No Status`}</span>
          : <input autoFocus={true} onChange={this.onStatusChange} type='text' value={this.state.status} onBlur={this.deactivateEditMode} />}
      </div>
    )
  }
}

export default ProfileStatus;