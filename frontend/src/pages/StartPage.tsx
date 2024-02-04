import Navbar from "../components/Navbar"

function StartPage() {
  return (
    <div>
        <Navbar />
        <h1>Learn your flashcards with feedback</h1>
        <div id="stars1"></div>
        <div id="stars2"></div>
        {/* <div id="stars3"></div> */}
        <a href="/import">Create Your Flashcards</a>
    </div>
    
  )
}

export default StartPage