import React from 'react';
import '../Home/styles.css'

const Home: React.FC = () => {
  return (

    <>
      <div className="home-text">
        <h1>Painel Administrativo</h1>
      </div>
      <div >
        <img
          id="dash-image"
          alt=""
          src="./dash_image.svg"
          width= "1000"
          className="d-inline-block align-top" />
      </div>
    </>
  )
}

export default Home;

