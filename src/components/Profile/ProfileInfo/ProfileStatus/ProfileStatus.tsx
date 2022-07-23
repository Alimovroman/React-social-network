import React, { ChangeEvent, useEffect, useState } from "react";

type Props = {
  authorizedUserId: number
  status: string
  putStatus: (status:string) => void
  userId: number
}

const ProfileStatus: React.FC<Props> = ({authorizedUserId, status, putStatus, userId}) => {
  const [statusLocal, setStatusLocal] = useState(status);
  const [editMode, setEditMode] = useState(false)

  let activateEditMode = () => {
    if (userId === authorizedUserId) {
      setEditMode(true)
    }
  };
  let deactivateEditMode = () => {
    putStatus(statusLocal);
      setEditMode(false)

  };
  let onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
    setStatusLocal(e.currentTarget.value)
  };
   useEffect(() => {
       setStatusLocal(statusLocal)
   }, [status])

  return (
    <div>
      {!editMode
        ? <div>
          <p onDoubleClick={() => activateEditMode()}>{statusLocal || `No Status`}</p>
        </div>
        : <div>
          <input autoFocus={true} onChange={onStatusChange} type='text' value={statusLocal} onBlur={deactivateEditMode} />
        </div>
      }
    </div>
  )
}


export default ProfileStatus;