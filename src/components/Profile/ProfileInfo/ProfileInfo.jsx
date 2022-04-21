import classes from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
  return (
    <div>
      <div>
        <img src='https://www.gazetemistanbul.com/images/haberler/2015/09/quiksilver_iflas_bayragini_cekti_h12541_5805c.jpg' alt='banner'></img>
      </div>
      <div className={classes.userProfile}>
        <div>
          <img src='https://sun9-7.userapi.com/impf/c9232/v9232238/364c/CBvTxC4_8VA.jpg?size=130x130&quality=96&sign=75221a12a00bbe5d8d3b94bf4e5ca1fb&c_uniq_tag=_GmlDK_k-KhNVGKhUlfFLLur2XpCwEOrnVh6Mw16sfA&type=album' alt='avatar'></img>
        </div>
        <div>
          <h2 className={classes.nameUser}>Roman Alimov and Finished 48 lesson</h2>
          <p>Date of birth: 10 may</p>
          <p>Cite: Ryazan</p>
          <p>Education: higher</p>
          <p>Web site: not site</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo;