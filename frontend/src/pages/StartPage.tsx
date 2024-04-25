import Navbar from "../components/Navbar"
import "../styles/StartPage.css";

function StartPage() {
  return (
    <div className='start-page'>
      <Navbar />
      <div id="stars1"></div>
      <div id="stars2"></div>
      <div id="solar-syst">
        <div className="planet" id="sun"></div>
        <div className="planet" id="mercury"></div>
        <div className="planet" id="venus"></div>
        <div className="planet" id="earth"></div>
        <div className="planet" id="mars"></div>
        {/* <div className="planet" id="jupiter"></div> */}
        <div className="planet" id="saturn"></div>
        <div className="planet" id="uranus"></div>
        <div className="planet" id="neptune"></div>
        <div className="planet" id="pluto"></div>
        <div className="asteroid-belt"></div>
      </div>
      <h1>Memorize FlashCards with Feedback</h1>
      <br></br>
      <br></br>
      <br></br>
      <a className="a-button" href="/create-flashcards">
        <span className="button-text light-mode">Create Your Flashcards</span>
      </a>
    </div>
  )
}

export default StartPage