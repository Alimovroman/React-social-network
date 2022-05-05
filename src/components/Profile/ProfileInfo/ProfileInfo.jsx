import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';

let pathAvatar = 'https://sun9-7.userapi.com/impf/c9232/v9232238/364c/CBvTxC4_8VA.jpg?size=130x130&quality=96&sign=75221a12a00bbe5d8d3b94bf4e5ca1fb&c_uniq_tag=_GmlDK_k-KhNVGKhUlfFLLur2XpCwEOrnVh6Mw16sfA&type=album';

const ProfileInfo = (props) => {
  if (props.userProfile == null || undefined) {
    return <Preloader />
  }
  return (
    <div>
      <div>
        <img src='https://www.gazetemistanbul.com/images/haberler/2015/09/quiksilver_iflas_bayragini_cekti_h12541_5805c.jpg' alt='banner'></img>
      </div>
      <div className={classes.userProfile}>
        <div>
          <img src={props.userProfile.photos.small} alt='avatar'></img>
        </div>
        <div>
          <h2 className={classes.nameUser}>{props.userProfile.fullName} and Finished 63 lesson</h2>
          <h3>{props.userProfile.lookingForAJobDescription}</h3>
          <p>Date of birth: 10 may</p>
          <p>Cite: Ryazan</p>
          <p>Education: higher</p>
          <p>Job search: {props.userProfile.lookingForAJob ? 'Yes' : 'Not'}</p>
          <p>About Me: {props.userProfile.aboutMe}</p>
          <div>
            <h4>Social network</h4>
            <p>Vk: <a href='#'>{props.userProfile.contacts.vk}</a></p>
            <p>Website:  <a href='#'>{props.userProfile.contacts.website}</a></p>
            <p>instagram:  <a href='#'>{props.userProfile.contacts.instagram}</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo;