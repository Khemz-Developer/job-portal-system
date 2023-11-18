import React from 'react';
import './middle.css';
import sltImage from "../assets/images/1.png";

const Middle = () => {
  return (
    <div className='outer-div'>
      <img src={sltImage} alt='sltImage' className='sltImage'/>
    </div>
  )
}

export default Middle
