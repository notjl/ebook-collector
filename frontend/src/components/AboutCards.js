import React from 'react'
import './AboutCards.css'

const AboutCards = () => {
  return (
    <div className='aboutCards'>
        <div className='project'>
            <img src={require('./assets/titleLogo.png')} alt='logo'></img>
            <h2>E-book repository</h2>
            <p>is an E-Book collector software for collecting E-Books and helps categorizing, searching, <br />
            managing said E-Books that can be uploaded by professors or administrators that can be <br /> viewed and
            downloaded by the students who have access to the service.</p>
            <h1>THE TEAM</h1>
        </div>
        <div className='card-container'>
            <div className='card1'>
                <h3>ADVISOR</h3>
                <span className='bar'></span>
                <img src={require('./assets/Adviser.jpg')} alt='DevImg'></img>
                <p>Dr. Jonathan Taylar</p>
                <a style={{textDecoration: "none"}} href="https://www.linkedin.com/in/jonathan-taylar-b56502b7/?originalSubdomain=ph">&lt; o t i t s &gt;</a>
                <p>jtaylar.cpe@tip.edu.ph</p>
                <p></p>
            </div>
            <div className='card1'>
                <h3>LEAD BACKEND DEVELOPER</h3>
                <span className='bar'></span>
                <img src={require('./assets/Dev1.png')} alt='DevImg'></img>
                <p>Angel Gabriel Cabezas</p>
                <a style={{textDecoration: "none"}} href="https://github.com/notjl">&lt; n o t j l &gt;</a>
                <p>agcabezas@pm.me</p>
                <p>09761441683</p>
            </div>
            <div className='card1'>
                <h3>LEAD FRONTEND DEVELOPER</h3>
                <span className='bar'></span>
                <img src={require('./assets/Dev2.jpg')} alt='DevImg'></img>
                <p>Jerome Christian Alapad</p>
                <a style={{textDecoration: "none"}} href="https://github.com/jeromealapad13">&lt; j i m i &gt;</a>
                <p>qjcmalapad@tip.edu.ph</p>
                <p>09958621171</p>
            </div>
            <div className='card1'>
                <h3>QUALITY ASSURANCE</h3>
                <span className='bar'></span>
                <img src={require('./assets/Dev3.png')} alt='DevImg'></img>
                <p>Jade Vergil Orario</p>
                <a style={{textDecoration: "none"}} href="https://github.com/JadeVergel">&lt; j a d e &gt;</a>
                <p>qjvorario@tip.edu.ph</p>
                <p>09276688653</p>
            </div>
            <div className='card1'>
                <h3>UI/UX FRONTEND DEVELOPER</h3>
                <span className='bar'></span>
                <img src={require('./assets/Dev4.jpg')} alt='DevImg'></img>
                <p>Jan Angelo Paras</p>
                <a style={{textDecoration: "none"}} href="https://github.com/qjabparas">&lt; g e l o &gt;</a>
                <p>qjabparas@tip.edu.ph</p>
                <p>09051701726</p>
            </div>
            <div className='card1'>
                <h3>UI/UX FRONTEND DEVELOPER</h3>
                <span className='bar'></span>
                <img src={require('./assets/Dev5.jpg')} alt='DevImg'></img>
                <p>Kierwin Jov Ramos</p>
                <a style={{textDecoration: "none"}} href="https://github.com/Blurene97">&lt; k i j e &gt;</a>
                <p>qkjpramos@tip.edu.ph</p>
                <p>09394150680</p>
            </div>
        </div>
    </div>
  )
}

export default AboutCards
