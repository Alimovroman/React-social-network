import React, { useEffect, useState } from "react";

const ProfileStatus = (props) => {
  //debugger
  //console.log(prevProps)
  const [status, setStatus] = useState(props.status);
  const [editMode, setEditMode] = useState(false)

  let activateEditMode = () => {
    if (props.userId === props.authorizedUserId) {
      setEditMode(true)
    }
  };
  let deactivateEditMode = () => {
    props.putStatus(status);
    setTimeout(() => {
      setEditMode(false)
    }, 200)

  };
  let onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  };
   useEffect(() => {
       setStatus(props.status)
   }, [props.status])

  return (
    <div>
      {!editMode
        ? <div>
          <p onDoubleClick={() => activateEditMode()}>{props.status || `No Status`}</p>
        </div>
        : <div>
          <input autoFocus={true} onChange={onStatusChange} type='text' value={status} onBlur={deactivateEditMode} />
        </div>
      }
    </div>
  )
}

class ProfileStatusClassComponent extends React.Component {
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

  showingTheStatus = () => {
    !this.state.editMode
      ? (<div>
        <span onDoubleClick={() => this.activateEditMode()}>{this.props.status || `No Status`}</span>
      </div>)
      : (<div>
        <input autoFocus={true} onChange={this.onStatusChange} type='text' value={this.state.status} onBlur={this.deactivateEditMode} />
      </div>)
  }

  onStatusChange(e) {
    this.setState({
      status: e.currentTarget.value
    })
  }
  activateEditMode() {
    if (this.props.userId === 6990) {
      this.setState({
        editMode: true
      });
    }
  }
  deactivateEditMode() {
    this.props.putStatus(this.state.status);
    setTimeout(() => {
      this.setState({
        editMode: false
      });
    }, 200)
  }
  componentDidUpdate(prevProps, precState) {
    if (this.props.status !== prevProps.status) {
      this.setState({
        status: this.props.status
      })
    }

  }

  render() {
    return (
      <div>
        {!this.state.editMode
          ? <div>
            <p onDoubleClick={() => this.activateEditMode()}>{this.props.status || `No Status`}</p>
          </div>
          : <div>
            <input autoFocus={true} onChange={this.onStatusChange} type='text' value={this.state.status} onBlur={this.deactivateEditMode} />
          </div>
        }
      </div>
    )
  }
}

export default ProfileStatus;