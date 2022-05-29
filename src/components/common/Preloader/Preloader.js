import preLoader from '../../../assets/images/preLoader.svg';
import React from 'react';

const Preloader = (props) => {
  return (
    <div>
      <img src={preLoader} alt=''/>
    </div>
  )
};

export default Preloader;