import React, { useEffect, useState } from "react";

const ProfileStatus = (props) => {
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


export default ProfileStatus;