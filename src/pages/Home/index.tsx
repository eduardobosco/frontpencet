import React from 'react';
import '../Home/styles.css'
import { ReactComponent as DashImage } from '../../Assets/dashImage.svg'
import { ReactComponent as Logo } from '../../Assets/logo.svg'


const Home = () => (

  <div className="home-container">
        <div className="home-text">
          <Logo className="home-logo"/>
          <h1 className="home-text-title">Bem Vindo!</h1>
          <h3 className="home-text-subtitle">Painel Administrativo Pencet</h3>
        </div>
      <DashImage className='home-image' />
  </div>

);

export default Home;
