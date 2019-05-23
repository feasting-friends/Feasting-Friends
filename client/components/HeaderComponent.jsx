import React from 'react';
import { Link } from "react-router-dom";
import Slideshow from "../containers/SlideshowContainer"
import './HeaderComponent.css'

const HeaderComponent = () => (
  <div id="headerComp">
    <Slideshow />
    <img class="App-logo " src="https://res.cloudinary.com/cloudimgts/image/upload/v1558644110/logo.2160f18d.png" />
    <h1 style={{ textAlign: 'right' }}>Feasting With Friends</h1>
    <Link to="/main">
      <button className='header-button'>Homepage!</button>
    </Link>
    <Link to="/">
      <button className='header-button'>Login!</button>
    </Link>
    <Link to="/signup">
      <button className='header-button'>Signup!</button>
    </Link>
  </div >
)

export default HeaderComponent;
