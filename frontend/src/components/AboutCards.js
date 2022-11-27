import React from 'react'
import './AboutCards.css'

const AboutCards = () => {
  return (
    <div className='aboutCards'>
        <div className='project'>
            <img src={require('../assets/titleLogo.png')} alt='logo'></img>
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
                <img src={require('../assets/Adviser.jpg')} alt='DevImg'></img>
                <p>Dr. Jonathan Taylar</p>
                <p>jtaylar.cpe@tip.edu.ph</p>
                <p>contact number</p>
            </div>
            <div className='card1'>
                <h3>LEAD BACKEND DEVELOPER</h3>
                <span className='bar'></span>
                <img src={require('../assets/Dev1.png')} alt='DevImg'></img>
                <p>Angel Gabriel Cabezas</p>
                <p>agcabezas@pm.me</p>
                <p>09761441683</p>
            </div>
            <div className='card1'>
                <h3>LEAD FRONTEND DEVELOPER</h3>
                <span className='bar'></span>
                <img src={require('../assets/Dev2.jpg')} alt='DevImg'></img>
                <p>Jerome Christian Alapad</p>
                <p>qjcmalapad@tip.edu.ph</p>
                <p>09958621171</p>
            </div>
            <div className='card1'>
                <h3>QUALITY ASSURANCE</h3>
                <span className='bar'></span>
                <img src={require('../assets/placeholder.png')} alt='DevImg'></img>
                <p>Jade Vergil Orario</p>
                <p>qjvorario@tip.edu.ph</p>
                <p>09276688653</p>
            </div>
            <div className='card1'>
                <h3>UI/UX FRONTEND DEVELOPER</h3>
                <span className='bar'></span>
                <img src={require('../assets/Dev4.jpg')} alt='DevImg'></img>
                <p>Jan Angelo Paras</p>
                <p>qjabparas@tip.edu.ph</p>
                <p>contact number</p>
            </div>
            <div className='card1'>
                <h3>UI/UX FRONTEND DEVELOPER</h3>
                <span className='bar'></span>
                <img src={require('../assets/Dev5.jpg')} alt='DevImg'></img>
                <p>Kierwin Jov Ramos</p>
                <p>qkjpramos@tip.edu.ph</p>
                <p>09394150680</p>
            </div>
        </div>
    </div>
  )
}

export default AboutCards
