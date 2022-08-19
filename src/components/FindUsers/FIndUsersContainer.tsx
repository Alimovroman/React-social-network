import React from 'react';
import FindUsers from './FindUsers';
import Preloader from "../common/Preloader/Preloader";
import { getIsFetching } from "../../state/findUsers-selectors";
import { useSelector } from "react-redux";

const FindUsersPageContainer: React.FC = (props) => {
  const isFetching = useSelector(getIsFetching)

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <FindUsers />
    </>
  )
}


export default FindUsersPageContainer