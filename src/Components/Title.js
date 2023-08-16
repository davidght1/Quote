import React from 'react';
import "../css/Title.css";
import logo from "../images/logo.png"; // Update the path to your logo image

const Title = () => {
  return (
    <div className='title-container'>
      <img src={logo} alt="Logo" className="logo" />
      <h1 className='title'>Welcome to our Quote Website</h1>
    </div>
  );
}

export default Title;
